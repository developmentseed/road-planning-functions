function round (value, decimals = 2) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Adds a scaled score to objects (0 - 100). By default it applies a linear
 * scale, though logscale is also available.
 *
 * @param {Array}   data              Data to add the score to.
 * @param {Number}  data[].value      The value to scale.
 * @param {Object}  [options]         Options object.
 * @param {Boolean} [options.log]     Use logscale instead of linear.
 *
 * @example
 * // returns [{'value': 20, 'score': 40}, {'value': 50, 'score': 100}]
 * addScaledScore([{'value': 20}, {'value': 50}])
 *
 * @return {Array}             Array with scaled score.
 *
 */
function addScaledScore (data, options = {}) {
  const {
    log = false
  } = options;

  const values = data.map(datum => datum.value).filter(value => !isNaN(value));

  const domain = log
    ? [Math.log(Math.min(...values)), Math.log(Math.max(...values))]
    : [Math.min(...values), Math.max(...values)];
  const range = domain[1] - domain[0];

  // Scale values from 0-100
  return data
    .filter(datum => !isNaN(datum.value))
    .map(datum => {
      const value = log ? Math.log(datum.value) : datum.value;
      return {
        ...datum,
        score: round((value - domain[0]) * 100 / range, 2)
      };
    });
}

module.exports = {
  addScaledScore
};
