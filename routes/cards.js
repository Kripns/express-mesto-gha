import express from 'express'
import { getAllCards, createCard, deleteCard } from '../controllers/cards.js';
const router = express.Router();

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

export default router;