import express from 'express'

const router = express.Router();

router.get('/', getAllCards);
router.get('/:id', getCard);
router.post('/', createCard);

export default router;