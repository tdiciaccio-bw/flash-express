import { Router, Request, Response } from 'express';
import { getDecksByUserId } from '../db/deckDAO';
import { handleGetDecksByEmail, handlePost } from '../handlers/deckHandler';
import Deck from '../models/deck';

export const router = Router();

interface UserId {
	userId: string;
}

router.get('/', async (req: Request<unknown, unknown, unknown, UserId>, res: Response) => {
  const { headers } = req;
  const token = headers.authorization?.trim().split(' ')[1];
  if (!token) {
    res.sendStatus(403);
    return;
  }
  const decks = await handleGetDecksByEmail(token);
  res.json(decks).status(200);
});

router.post('/', async (req: Request<unknown, unknown, Deck, unknown>, res: Response) => {
  const { body, headers } = req;
  const token = headers.authorization?.trim().split(' ')[1];
  if (!token) {
    res.sendStatus(403);
    return;
  }
  await handlePost(body, token);
  res.sendStatus(201);
});
