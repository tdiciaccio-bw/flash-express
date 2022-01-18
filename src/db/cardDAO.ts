import knex from 'knex';
import { config } from './config';
import Card from '../models/card';
import { Card as DBCard } from '../models/cardDatabase';

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
  const knexInstance = knex(config);

  try {
    await knexInstance<DBCard>('card')
      .where('id', card.id)
      .update({
        correct_streak: card.correctStreak,
        easiness: card.easiness,
        next_due_date: card.nextDueDate
      });
  } catch (e) {
    console.log(e);
  }
}
