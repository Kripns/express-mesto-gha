/* eslint-disable import/extensions */
import express from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getAllUsers, getCurrentUser, getUser, updateAvatar, updateUserInfo,
} from '../controllers/users.js';
import urlPattern from '../utils/urlPattern.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi
      .string()
      .hex()
      .length(24)
      .required(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30),
    about: Joi
      .string()
      .min(2)
      .max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .min(2)
      .uri()
      .pattern(urlPattern),
  }),
}), updateAvatar);

export default router;
