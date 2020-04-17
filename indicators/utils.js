function round (value, decimals = 2) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Adds a scaled score (0-100) to objects
 *
 * @param  {Array} data        Data to add the score to.
 *
 * @example
 * // returns [{'value': 20, 'score': 40}, {'value': 50, 'score': 100}]
 * addScaledScore([{'value': 20}, {'value': 50}])
 *
 * @return {Array}             Array with scaled
 *
 */
function addScaledScore (data) {
  const maxValue = Math.max(...data.map(w => w.value).filter(v => !isNaN(v)));

  // Scale values from 0-100
  return data.map(datum => ({ ...datum, score: round(datum.value / maxValue * 100, 2) }));
}

module.exports = {
  addScaledScore
};
