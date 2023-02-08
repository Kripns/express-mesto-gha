/* eslint-disable import/extensions */
import express from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} from '../controllers/cards.js';
import urlPattern from '../utils/urlPattern.js';

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
      .required()
      .pattern(urlPattern),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .hex()
      .length(24)
      .required(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .hex()
      .length(24)
      .required(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .hex()
      .length(24)
      .required(),
  }),
}), dislikeCard);

export default router;
