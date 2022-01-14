import knex from 'knex';
import { config } from './config';
import Card from '../models/card';

export async function getAllCards() {
  const knexInstance = knex(config);
	
  try {
    const cards = await knexInstance<Card>('card').select();
    return cards;
  } catch (e) {
    console.log(e);
  }
}

export async function getLesson(deckId: number, size: number) {
  const knexInstance = knex(config);

  try {
    const cards = await knexInstance<Card>('card')
      .where('deck_id', deckId)
      .orderBy('next_due_date')
      .limit(size);
    return cards;
  } catch (e) {
    console.log(e);
  }
}

export async function updateCard(card: Card) {
  console.log(`Updating card: ${card}`);
  return null;
}
