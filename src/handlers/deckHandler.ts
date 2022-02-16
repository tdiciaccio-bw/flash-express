import { getUserByEmail } from '../db/userDAO';
import { createDeck, getDecksByUserId } from '../db/deckDAO';
import Deck from '../models/deck';
import { getEmailFromToken } from '../utils/authUtils';

export async function handleGetDecksByEmail(token: string) {
  try {
    const email = await getEmailFromToken(token);
    const user = await getUserByEmail(email);
		
    if (!user) {
      throw new Error('User not found');
    }
		
    return await getDecksByUserId(user.id);
  } catch (e) {
    console.log(e);
  }
	
}

export async function handlePost(deck: Deck, token: string) { 
  try {
    const email = await getEmailFromToken(token);
    const user = await getUserByEmail(email);
	
    if (!user) {
      throw new Error('User not found');
    }
    deck.user_id = user.id;
	
    createDeck(deck);
  } catch (e) {
    console.log(e);
  }
}
