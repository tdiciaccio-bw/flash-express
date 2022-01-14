import { Router } from 'express';
import { router as userController } from './users';
import { router as cardController } from './cards';
import { router as deckController } from './decks';
import { router as lessonController } from './lesson';

export const router = Router();

router.use('/users', userController);
router.use('/cards', cardController);
router.use('/decks', deckController);
router.use('/lesson', lessonController);
