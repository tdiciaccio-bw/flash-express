import { assert, expect } from 'chai';
import { exportedForTesting } from '../../src/handlers/lessonHandler';
import Card from '../../src/models/card';
import { DataValidationError } from '../../src/utils/errors';

const { _calculateNewEasiness, _calculateNextReviewDate, _calculateCorrectStreak } = exportedForTesting;

describe('_calculateNewEasiness', () => {
  it('should return true', () => {
    assert.isTrue(true);
  });
	
  it('should return 1.3 as a floor', () => {
    const easiness = _calculateNewEasiness(1.3, 0);
    assert.equal(easiness, 1.3);
  });
	
  it('should return 2.5 as a ceiling', () => {
    const easiness = _calculateNewEasiness(2.5, 5);
    assert.equal(easiness, 2.5);
  });
	
  it('should return 1.8 for an initial easiness of 1.7 and score of 5', () => {
    const easiness = _calculateNewEasiness(1.7, 5);
    assert.equal(easiness, 1.8);
  });
});

describe('_calculateNextReviewDate', () => {
  it('should set next review date to tomorrow if correct streak is 0', () => {
    const card: Card = {
      id: 1,
      question: 'Question',
      answer: 'Answer',
      correctStreak: 0,
      easiness: 1.8,
      nextDueDate: new Date('2022-01-05'),
      deckId: 100
    };
    const newDate = _calculateNextReviewDate(card);
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    assert.equal(newDate.getDate(), targetDate.getDate());
  });
  
  it('should set the next review date to 6 days from today with a correct streak of 1 day', () => {
    const card: Card = {
      id: 1,
      question: 'Question',
      answer: 'Answer',
      correctStreak: 1,
      easiness: 1.8,
      nextDueDate: new Date('2022-01-05'),
      deckId: 100
    };
    const newDate = _calculateNextReviewDate(card);
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 6);
    assert.equal(newDate.getDate(), targetDate.getDate());
  });
  
  it('should set the next review date to 11 days from today with a correct streak of 2 days and easiness 1.8', () => {
    const card: Card = {
      id: 1,
      question: 'Question',
      answer: 'Answer',
      correctStreak: 2,
      easiness: 1.8,
      nextDueDate: new Date('2022-01-05'),
      deckId: 100
    };
    const newDate = _calculateNextReviewDate(card);
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 11);
    assert.equal(newDate.toDateString(), targetDate.toDateString());
  });
});

describe('_calculateCorrectStreak', () => {
  it('should reset the streak to 0 when score is less than 3', () => {
    const newStreak = _calculateCorrectStreak(5, 0);
    assert.equal(newStreak, 0);
  });
  
  it('should increment the streak by 1 when the score is between 3 and 5', () => {
    const newStreak = _calculateCorrectStreak(1, 3);
    assert.equal(newStreak, 2);
  });
  
  it('should throw an error when the score is not within 0-5', () => {
    expect(() => {
      _calculateCorrectStreak(0, 20); 
    }).to.throw(DataValidationError);
    
    expect(() => {
      _calculateCorrectStreak(0, -5);
    }).to.throw(DataValidationError);
  });
});
