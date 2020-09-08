const { assert } = require('chai');

const { addScaledScore } = require('../indicators/utils');

describe('Add scaled score to indicators', function () {
  it('Add correct score with default options', function () {
    const input = [
      { id: 1, value: 70 },
      { id: 2, value: 20 },
      { id: 3, value: 120 }
    ];
    const output = [
      { id: 1, value: 70, score: 50 },
      { id: 2, value: 20, score: 0 },
      { id: 3, value: 120, score: 100 }
    ];
    assert.deepEqual(addScaledScore(input), output);
  });

  it('Add correct score with logscale', function () {
    const input = [
      { value: 70 },
      { value: 20 },
      { value: 10000 }
    ];
    const output = [
      { value: 70, score: 20.16 },
      { value: 20, score: 0 },
      { value: 10000, score: 100 }
    ];
    assert.deepEqual(addScaledScore(input, { log: true }), output);
  });

  it('Handles non-numeric values', function () {
    const input = [
      { value: 0 },
      { value: 'AmIANumber?' },
      { value: 100 }
    ];
    const output = [
      { value: 0, score: 0 },
      { value: 100, score: 100 }
    ];
    assert.deepEqual(addScaledScore(input), output);
  });
});
