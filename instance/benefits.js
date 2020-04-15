/**
 * All the benefits are defines in this file which is shares between the api and
 * the analysis service.
 *
 * The calculation of each benefit is defined in the `analysis.js` file of the
 * analysis service. This is a hard requirement because the analysis runs
 * inside a container and the instance configuration must not depend on modules
 * defined inside the analysis service.
 */
const benefits = [
  {
    id: 'userCost',
    name: 'Decreased user cost'
  },
  {
    id: 'maintenanceCost',
    name: 'Decreased maintenance cost'
  },
  {
    id: 'floodEad',
    name: 'Reduction in flood risk for ANE'
  }
];

module.exports = {
  benefits
};
