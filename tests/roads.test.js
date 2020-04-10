const { assert } = require('chai')

const { setDefaultAttributes } = require('../roads/utils')

describe('Set default attributes', function () {
  const roadData = require('./fixtures/roads.json')

  it('Don\'t override existing attributes', function () {
    const expected = {
      id: '3307',
      length: 200,
      seasonality: 'all-weather',
      width: 'medium',
      surface: 'earth'
    }
    assert.deepEqual(setDefaultAttributes(roadData[0]), expected)
  })

  it('Override undefined attributes', function () {
    const expected = {
      id: '3308',
      length: 600,
      seasonality: 'dry-weather',
      width: 'small',
      surface: 'earth'
    }
    assert.deepEqual(setDefaultAttributes(roadData[1]), expected)
  })
})
