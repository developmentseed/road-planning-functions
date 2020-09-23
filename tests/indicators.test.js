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

  it('Add correct score using custom min', function () {
    const input = [
      { value: 20 },
      { value: 100 }
    ];
    const output = [
      { value: 20, score: 20 },
      { value: 100, score: 100 }
    ];
    assert.deepEqual(addScaledScore(input, { customMin: 0 }), output);
  });

  it('Correctly scale when customMin is higher than min value in dataset', function () {
    const input = [
      { value: 20 },
      { value: 55 },
      { value: 100 }
    ];
    const output = [
      { value: 20, score: 0 },
      { value: 55, score: 25 },
      { value: 100, score: 100 }
    ];
    assert.deepEqual(addScaledScore(input, { customMin: 40 }), output);
  });

  it('Correct scale using custom min and logscale', function () {
    const input = [
      { value: 20 },
      { value: 100 }
    ];
    const output = [
      { value: 20, score: 65.05 },
      { value: 100, score: 100 }
    ];
    assert.deepEqual(addScaledScore(input, { log: true, customMin: 1 }), output);
  });

  it('Correct scale using custom min of 0 and logscale', function () {
    const input = [
      { value: 20 },
      { value: 100 }
    ];
    const output = [
      { value: 20, score: 65.05 },
      { value: 100, score: 100 }
    ];
    assert.deepEqual(addScaledScore(input, { log: true, customMin: 0 }), output);
  });

  it('Handle non-numeric values', function () {
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
