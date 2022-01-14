import { Request, Response, Router } from 'express';
import { getAllCards } from '../db/cardDAO';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const cards = await getAllCards();
  res.send(cards).status(200);
});
