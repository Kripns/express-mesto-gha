
import User from "../models/user";
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
})


router.get('/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
})


router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }))
})
