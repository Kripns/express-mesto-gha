import path from 'path';
import express from "express";
import mongoose from "mongoose";
import router from './routes/users.js';
import bodyParser from 'body-parser';

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();



mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  req.user = {
    _id: '63c6557d5df5fbd2e31b4750'
  };
  next();
});

app.use('/users', router);

app.listen(PORT, () => {
  console.log('BASE_PATH ', BASE_PATH)
  console.log('port is ', PORT)
})