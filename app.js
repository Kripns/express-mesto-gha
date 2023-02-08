/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { celebrate, Joi, errors } from 'celebrate';
import { login, createUser } from './controllers/users.js';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import auth from './middlewares/auth.js';
import NotFoundError from './utils/errors/not-found-error.js';
import urlPattern from './utils/urlPattern.js';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', celebrate({
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

app.post('/signup', celebrate({
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
      .max(30)
      .uri()
      .pattern(urlPattern),
  }),
}), createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use((req, res, next) => {
  const err = new NotFoundError('Ошибка 404: Страница не найдена');
  next(err);
});

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
