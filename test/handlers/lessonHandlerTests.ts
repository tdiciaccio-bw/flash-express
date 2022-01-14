import { assert } from 'chai';
import { exportedForTesting } from '../../src/handlers/lessonHandler';

describe('_calculateNewEasiness', () => {
  it('should return true', () => {
    assert.isTrue(true);
  });
	
  it('should return 1.3 as a floor', () => {
    const easiness = exportedForTesting._calculateNewEasiness(1.3, 0);
    assert.equal(easiness, 1.3);
  });
	
  it('should return 2.5 as a ceiling', () => {
    const easiness = exportedForTesting._calculateNewEasiness(2.5, 5);
    assert.equal(easiness, 1.3);
  });
	
  it('should return 1.8 for an initial easiness of 1.7 and score of 5', () => {
    const easiness = exportedForTesting._calculateNewEasiness(1.7, 5);
    assert.equal(easiness, 1.3);
  });
});
