/* eslint-disable import/extensions */
import express from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards.js';

const router = express.Router();

router.get('/', getAllCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required(),
    link: Joi
      .string()
      .uri()
      .required(),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .alphanum()
      .length(24),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .alphanum()
      .length(24),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .alphanum()
      .length(24),
  }),
}), dislikeCard);

export default router;
