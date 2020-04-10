const config = require('../config').default

/**
 * Sets default attributes when road attributes are missing.
 *
 * @param {Object}  road      Road segment
 *
 * @returns {Object} The road segment with new default attributes.
 */
function setDefaultAttributes (road) {
  const overrides = config.defaultRoadAttr.reduce((newA, attr) => {
    if (road[attr.key]) return newA
    return {
      ...newA,
      [attr.key]: attr.value
    }
  }, {})

  return {
    ...road,
    ...overrides
  }
}

module.exports = {
  setDefaultAttributes
}
