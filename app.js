/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { login, createUser } from './controllers/users.js';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import auth from './middlewares/auth.js';
import { handleNotFoundError } from './utils/errorHandlers.js';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((req, res) => {
  handleNotFoundError(res, 'Ошибка 404: Страница не найдена');
});

app.listen(PORT);
