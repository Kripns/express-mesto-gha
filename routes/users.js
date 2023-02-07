/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import express from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getAllUsers, getCurrentUser, getUser, updateAvatar, updateUserInfo,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
  params: object().keys({
    id: Joi
      .string()
      .alphanum()
      .length(24),
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
      .max(30)
      .uri(),
  }),
}), updateAvatar);

export default router;
