import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";
import cardRouter from "./routes/cards.js";
import bodyParser from "body-parser";
import { handleNotFoundError } from "./utils/errorHandlers.js";

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: "63c6557d5df5fbd2e31b4750" };
  next();
});

app.use("/users", userRouter);
app.use("/cards", cardRouter);
app.use((req, res) => {
  handleNotFoundError(res, 'Ошибка 404: Страница не найдена')
});

app.listen(PORT, () => {
  console.log("port is ", PORT);
});
