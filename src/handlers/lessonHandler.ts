import { updateCard } from '../db/cardDAO';
import ScoredResponse from '../models/scoredResponse';
import Card from '../models/card';
import { DataValidationError } from '../utils/errors';

export async function handleLesson(scoredCardArray: ScoredResponse[]) {
  await Promise.all(
    scoredCardArray.map(async (response) => {
      const { card, score } = response;
      card.correctStreak = _calculateCorrectStreak(card.correctStreak, score);
      card.easiness = _calculateNewEasiness(card.easiness, score);
      card.nextDueDate = _calculateNextReviewDate(card);
      await updateCard(card);
    })
  );
}

function _calculateNewEasiness(easiness: number, score: number) : number {
  const EASINESS_LOWER_BOUND = 1.3;
  const EASINESS_UPPER_BOUND = 2.5;
  let newEasiness = easiness - .8 + (.28 * score) - (.02 * score * score);
  newEasiness = Math.round(newEasiness * 10) / 10;
  if (newEasiness < EASINESS_LOWER_BOUND) {
    return EASINESS_LOWER_BOUND;
  } else if (newEasiness > EASINESS_UPPER_BOUND) {
    return EASINESS_UPPER_BOUND;
  } else {
    return newEasiness;
  }
}

function _calculateNextReviewDate(card: Card) : Date {
  const { correctStreak, easiness } = card;
  const date = new Date();
  if (correctStreak === 0) {
    date.setDate(date.getDate() + 1);
  } else {
    const daysToAdd = 6 * Math.pow(easiness, (correctStreak - 1));
    date.setDate(date.getDate() + Math.round(daysToAdd));
  }
  return date;
}

function _calculateCorrectStreak(currentStreak: number, score: number) : number {
  if (score > 5 || score < 0) {
    throw new DataValidationError(`Score ${score} out of range: 0-5`);
  }
  if (score >= 3) {
    return currentStreak + 1;
  } else {
    return 0;
  }
}

export const exportedForTesting = {
  _calculateNewEasiness,
  _calculateNextReviewDate,
  _calculateCorrectStreak
};
