/* eslint-disable import/first */
/* eslint-disable import/extensions */
import * as dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import routes from './routes/index.js';
import centralizedErrorHandler from './middlewares/centralizedErrorHandler.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import corsHandler from './middlewares/cors.js';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(corsHandler);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT);
