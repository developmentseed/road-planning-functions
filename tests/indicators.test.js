const { assert } = require('chai');

const { addScaledScore } = require('../indicators/utils');

describe('Add scaled score to indicators', function () {
  it('Add correct score', function () {
    const input = [
      { id: 1, value: 60 },
      { id: 2, value: 20 },
      { id: 3, value: 120 }
    ];
    const output = [
      { id: 1, value: 60, score: 50 },
      { id: 2, value: 20, score: 16.67 },
      { id: 3, value: 120, score: 100 }
    ];
    assert.deepEqual(addScaledScore(input), output);
  });
});
