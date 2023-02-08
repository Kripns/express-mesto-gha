/* eslint-disable import/extensions */
import isUrl from 'validator/lib/isURL.js';
import Card from '../models/card.js';
import BadRequestError from '../utils/errors/bad-request-error.js';
import NotFoundError from '../utils/errors/not-found-error.js';
import ForbiddenError from '../utils/errors/forbiden-error.js';

export function getAllCards(req, res, next) {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

export function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!isUrl(link)) throw new BadRequestError('Неправильный формат ссылки');
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
}

export function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Запрашиваемая карточка не найдена');
      if (card.owner.valueOf() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((removedCard) => res.send({ data: removedCard }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введен некорректный _id карточки'));
      } else {
        next(err);
      }
    });
}

export function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError('Запрашиваемая карточка не найдена');
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введен некорректный _id карточки'));
      } else {
        next(err);
      }
    });
}

export function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError('Запрашиваемая карточка не найдена');
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введен некорректный _id карточки'));
      } else {
        next(err);
      }
    });
}
