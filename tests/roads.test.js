const { assert } = require('chai')

const { setDefaultAttributes } = require('../roads/utils')

describe('Set default attributes', function () {
  const roadData = require('./fixtures/roads.json')

  it('Don\'t override existing attributes', function () {
    const expected = {
      id: '3307',
      seasonality: 'all-weather',
      width: 'medium',
      surface: 'earth'
    }
    assert.deepEqual(setDefaultAttributes(roadData[0]), expected)
  })

  it('Override undefined attributes', function () {
    const expected = {
      id: '3308',
      seasonality: 'dry-season',
      width: 'small',
      surface: 'earth'
    }
    assert.deepEqual(setDefaultAttributes(roadData[1]), expected)
  })
})
