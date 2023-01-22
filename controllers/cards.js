import Card from "../models/card.js";

export function getAllCards(req, res) {
  Card.find({})
    .populate('owner')
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
};

export function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  .then(card => res.send({ data: card }))
  .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
};

export function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
};

export function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
};

export function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
};