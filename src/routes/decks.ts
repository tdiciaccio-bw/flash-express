import { Router, Request, Response } from 'express';
import { getDecksByUserId } from '../db/deckDAO';

export const router = Router();

interface UserId {
	userId: string;
}

router.get('/', async (req: Request<unknown, unknown, unknown, UserId>, res: Response) => {
  const { query } = req;
  const decks = await getDecksByUserId(parseInt(query.userId));
  res.json(decks).status(200);
});
