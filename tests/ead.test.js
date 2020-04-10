const { assert } = require('chai')

const { calculateEAD } = require('../roads/ead')

describe('Damage functions', function () {
  describe('Calculate Estimated Annual Damages', function () {
    it('Correctly calculate EAD', function () {
      const input = [
        { rp: 5, damage: 10 },
        { rp: 10, damage: 20 },
        { rp: 20, damage: 20 },
        { rp: 50, damage: 60 }
      ]
      const expected = 3.7
      assert.equal(calculateEAD(input), expected)
    })
  })
})
