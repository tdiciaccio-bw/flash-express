import { Router, Request, Response } from 'express';
import { getLesson } from '../db/cardDAO';
import { handleLesson } from '../handlers/lessonHandler';
import ScoredResponse from '../models/scoredResponse';

export const router = Router();

interface LessonParams {
	size: number;
	deckId: number;
}



router.get('/', async (req: Request<unknown, unknown, unknown, LessonParams>, res: Response) => {
  const { deckId, size } = req.query;

  const cards = await getLesson(deckId, size);
  res.json(cards).status(200);

});

router.post('/', async (req: Request<unknown, unknown, ScoredResponse[], unknown>, res: Response) => {
  const { body } = req;
  handleLesson(body);
  res.sendStatus(200);
});
