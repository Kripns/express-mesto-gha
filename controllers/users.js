/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isUrl from 'validator/lib/isURL.js';
import User from '../models/user.js';
import BadRequestError from '../utils/errors/bad-request-error.js';
import NotFoundError from '../utils/errors/not-found-error.js';
import ConflictError from '../utils/errors/conflict-error.js';
import secretKey from '../utils/secretKey.js';

export function getAllUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}

export function getUser(req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) throw new NotFoundError('Запрашиваемый пользователь не найден');
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введен некорректный _id пользователя'));
      }
      next(err);
    });
}

export function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then((user) => {
          if (!isUrl(avatar)) throw new BadRequestError('Неправильный формат ссылки');
          return res.send({ data: user });
        })
        .catch((err) => {
          if (err.code && err.code === 11000) {
            next(new ConflictError('Пользователь с такой почтой уже зарегистрирован'));
          }
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные'));
          }
          next(err);
        });
    });
}

export function login(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
}

export function updateUserInfo(req, res, next) {
  const { name, about } = req.body;
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Запрашиваемый пользователь не найден');
      User.findByIdAndUpdate(
        req.user._id,
        { name, about },
        { new: true, runValidators: true },
      )
        .then((updatedUser) => res.send({ data: updatedUser }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введен некорректный _id пользователя'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
}

export function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Запрашиваемый пользователь не найден');
      if (!isUrl(avatar)) throw new BadRequestError('Неправильный формат ссылки');
      User.findByIdAndUpdate(
        req.user._id,
        { avatar },
        { new: true, runValidators: true },
      )
        .then((updatedUser) => res.send({ data: updatedUser }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введен некорректный _id пользователя'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
}

export function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Запрашиваемый пользователь не найден');
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введен некорректный _id пользователя'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
}
