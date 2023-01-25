/* eslint-disable import/extensions */
import Card from '../models/card.js';
import {
  handleBadRequestError,
  handleNotFoundError,
  handleDefaultError,
} from '../utils/errorHandlers.js';

export function getAllCards(req, res) {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(() => handleDefaultError(res));
}

export function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return handleBadRequestError(res);
      }
      return handleDefaultError(res);
    });
}

export function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return handleNotFoundError(res, 'Запрашиваемая карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return handleBadRequestError(res);
      }
      return handleDefaultError(res);
    });
}

export function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return handleNotFoundError(res, 'Запрашиваемая карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return handleBadRequestError(res);
      }
      return handleDefaultError(res);
    });
}

export function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return handleNotFoundError(res, 'Запрашиваемая карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return handleBadRequestError(res);
      }
      return handleDefaultError(res);
    });
}
