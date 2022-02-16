import knex from 'knex';
import { config } from './config';
import Deck from '../models/deck';

export async function getDecksByUserId(id: number) {
  const knexInstance = knex(config);

  try {
    const decks = await knexInstance<Deck>('deck').where('user_id', id);
    return decks;
  } catch (e) {
    console.log(e);
  }
}

export async function createDeck(deck: Deck) {
  const knexInstance = knex(config);
  try {
    await knexInstance<Deck>('deck').insert(deck);
  } catch (e) {
    console.log(e);
  }
}
