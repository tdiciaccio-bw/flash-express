import express, { Request, Response } from 'express';
import { getUsers } from '../db/userDAO';

export const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await getUsers();
  console.log(users);
  res.send(users).status(200);
});
