import User from "../models/user.js";
import {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} from "../utils/errorCodes.js";

export function getAllUsers(req, res) {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => {
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" });
    });
}

export function getUser(req, res) {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      res.send({ data: user });
    })
    .catch(err => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Переданы некорректные данные" });
      } else {
        return res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
}

export function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => {
      if(err.name === 'ValidatorError') {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Переданы некорректные данные" })
      }
      else {
        return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" });
      }
    });
}

export function udateUserInfo(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name: name, about: about },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      res.send({ data: user });
    })
    .catch(err => {
      if(err.name === 'ValidatorError') {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Переданы некорректные данные" })
      }
      else {
        return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" });
      }
    });
}

export function updateAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true })
    .then(user => {
      if(!user) {
        return res
        .status(NOT_FOUND_ERROR_CODE)
        .send({ message: "Запрашиваемый пользователь не найден" });
    }
    res.send({ data: user });
  })
    .catch(err => {
      if(err.name === 'ValidatorError') {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Переданы некорректные данные" })
      }
      else {
        return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" });
      }
    });
}
