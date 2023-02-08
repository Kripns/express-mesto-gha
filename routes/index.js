/* eslint-disable import/extensions */
import express from 'express';
import { celebrate, Joi } from 'celebrate';
import { login, createUser, logout } from '../controllers/users.js';
import userRouter from './users.js';
import cardRouter from './cards.js';
import auth from '../middlewares/auth.js';
import NotFoundError from '../utils/errors/not-found-error.js';
import urlPattern from '../utils/urlPattern.js';

const router = express.Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .required(),
    name: Joi
      .string()
      .default('Жак-Ив Кусто')
      .min(2)
      .max(30),
    about: Joi
      .string()
      .default('Исследователь')
      .min(2)
      .max(30),
    avatar: Joi
      .string()
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
      .min(2)
      .uri()
      .pattern(urlPattern),
  }),
}), createUser);

router.use(auth);

router.get('/signout', logout);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  const err = new NotFoundError('Ошибка 404: Страница не найдена');
  next(err);
});

export default router;
