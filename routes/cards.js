import express from 'express'
import { getAllCards, createCard, deleteCard, likeCard, dislikeCard } from '../controllers/cards.js';
const router = express.Router();

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

export default router;