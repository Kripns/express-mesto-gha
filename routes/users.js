/* eslint-disable import/extensions */
import express from 'express';
import {
  getAllUsers, getUser, createUser, updateAvatar, udateUserInfo,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', udateUserInfo);
router.patch('/me/avatar', updateAvatar);

export default router;
