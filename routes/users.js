/* eslint-disable import/extensions */
import express from 'express';
import {
  getAllUsers, getUser, updateAvatar, updateUserInfo,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);

export default router;
