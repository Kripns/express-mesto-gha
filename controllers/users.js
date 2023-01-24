import User from "../models/user.js";
import {
  handleBadRequestError,
  handleNotFoundError,
  handleDefaultError,
} from "../utils/errorHandlers.js";

export function getAllUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => handleDefaultError(res));
}

export function getUser(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return handleNotFoundError(res, "Запрашиваемый пользователь не найден");
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return handleBadRequestError(res);
      } else {
        return handleDefaultError(res);
      }
    });
}

export function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return handleBadRequestError(res);
      } else {
        return handleDefaultError(res);
      }
    });
}

export function udateUserInfo(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name: name, about: about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return handleNotFoundError(res, "Запрашиваемый пользователь не найден");
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return handleBadRequestError(res);
      } else {
        return handleDefaultError(res);
      }
    });
}

export function updateAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return handleNotFoundError(res, "Запрашиваемый пользователь не найден");
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return handleBadRequestError(res);
      } else {
        return handleDefaultError(res);
      }
    });
}
