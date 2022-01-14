import { updateCard } from '../db/cardDAO';
import ScoredResponse from '../models/scoredResponse';

export async function handleLesson(scoredCardArray: ScoredResponse[]) {
  scoredCardArray.forEach(response => {
    const { card, score } = response;
    card.easiness = _calculateNewEasiness(card.easiness, score);
    updateCard(card);
  });
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

export const exportedForTesting = {
  _calculateNewEasiness
};
