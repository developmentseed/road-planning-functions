function round (value, decimals = 2) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Adds a scaled score to objects (0 - 100). By default it applies a linear
 * scale, though natural logarithm is also available.
 *
 * @param {Array}   data                Data to add the score to.
 * @param {Number}  data[].value        The value to scale.
 * @param {Object}  [options]           Options object.
 * @param {Boolean} [options.log]       Use logscale instead of linear.
 * @param {Number}  [options.customMin] Override the min value in the dataset.
 *                                      By default this is automatically
 *                                      determined from data[]
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
    log = false,
    customMin = null
  } = options;

  const values = data.map(datum => datum.value).filter(value => !isNaN(value));

  // Override the min value in the dataset.
  let minValue = customMin !== null
    ? customMin
    : Math.min(...values);

  // To avoid issues with natural logarithm, minValue is ensured to be >1
  if (log && minValue < 1) minValue = 1;

  const domain = log
    ? [Math.log(minValue), Math.log(Math.max(...values))]
    : [minValue, Math.max(...values)];

  const range = domain[1] - domain[0];

  // Scale values from 0-100
  return data
    .filter(datum => !isNaN(datum.value))
    .map(datum => {
      // If custom minValue is set, make sure it's applied
      let value = datum.value < options.customMin
        ? options.customMin
        : datum.value;

      value = log ? Math.log(value) : value;
      const score = round((value - domain[0]) * 100 / range, 2);

      return {
        ...datum,
        score: score < 0 ? 0 : score
      };
    });
}

module.exports = {
  addScaledScore
};
