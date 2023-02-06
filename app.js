/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { login, createUser } from './controllers/users.js';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import auth from './middlewares/auth.js';
import NotFoundError from './utils/errors/not-found-error.js';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use((req, res, next) => {
  const err = new NotFoundError('Ошибка 404: Страница не найдена');
  next(err);
});

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
// TODO: не работают ошибки
// убрать во всех контроллерах 500 ошибку
