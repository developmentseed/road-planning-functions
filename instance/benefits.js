/**
 * All the benefits are defined in this file which is shared between the API and
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
    id: 'eaul',
    name: 'Expected annual user loss'
  },
  {
    id: 'floodEAD',
    name: 'Expected annual damage due to floods'
  }
];

module.exports = {
  benefits
};
