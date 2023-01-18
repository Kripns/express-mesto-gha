import User from "../models/user.js";

export function getAllUsers(req, res) {
  User.find({})
    .then(users => res.send({data: users}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
};

export function getUser(req, res) {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).res.send({message: 'Произошла ошибка'}))
};

export function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).res.send({message: 'Произошла ошибка'}))
}

