/* eslint-disable import/extensions */
import bcrypt from 'bcrypt';
// import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import isUrl from 'validator/lib/isURL.js';
import User from '../models/user.js';
import {
  handleBadRequestError,
  handleNotFoundError,
  handleDefaultError,
} from '../utils/errorHandlers.js';

const secretCode = 'f0c122a3d7449d928da12fd11eac41a3327b3f14b588358c7ba90c5abd9575c7';

export function getAllUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => handleDefaultError(res));
}

export function getUser(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return handleNotFoundError(res, 'Запрашиваемый пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return handleBadRequestError(res);
      }
      return handleDefaultError(res);
    });
}

export function createUser(req, res) {
  // eslint-disable-next-line object-curly-newline
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          if (!isUrl(avatar)) return handleBadRequestError(res);
          return res.send({ data: user });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return handleBadRequestError(res);
      }
      return handleDefaultError(res);
    });
}

export function login(req, res) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretCode, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7 }).end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
//  TODO CATCH ERRORS!!
}

export function udateUserInfo(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return handleNotFoundError(res, 'Запрашиваемый пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return handleBadRequestError(res);
      }
      return handleDefaultError(res);
    });
}

export function updateAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) return handleNotFoundError(res, 'Запрашиваемый пользователь не найден');
      if (!isUrl(avatar)) return handleBadRequestError(res);
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return handleBadRequestError(res);
      }
      return handleDefaultError(res);
    });
}
