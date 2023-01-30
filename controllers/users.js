/* eslint-disable import/extensions */
import bcrypt from 'bcrypt';
import isUrl from 'validator/lib/isURL.js';
import User from '../models/user.js';
import {
  handleBadRequestError,
  handleNotFoundError,
  handleDefaultError,
} from '../utils/errorHandlers.js';

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
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const {
        name,
        about,
        avatar,
        email,
      } = req.body;
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
