import Card from "../models/card.js";

export function getAllCards(req, res) {
  Card.find({})
    .populate('owner')
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
};

export function createCard(req, res) {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
  .then(card => res.send({ data: card }))
  .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
};

export function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
};