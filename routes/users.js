import { getAllUsers, getUser, createUser } from '../controllers/users.js';

import express from 'express';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);

export default router;