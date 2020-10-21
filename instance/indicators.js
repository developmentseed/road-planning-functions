// Export data according to environment. See README.md for information.
const indicators = process.env.NODE_ENV === 'production' || process.env.USE_PROD_DATA ? [
  {
    id: 'aadt',
    name: 'Annual Average Daily Traffic',
    defaultValue: 3
  },
  {
    id: 'flood-ead-fu',
    name: 'Flood risk - scour',
    description: 'Estimated Annual Damages due to river flooding',
    defaultValue: 3
  },
  {
    id: 'flood-ead-pu',
    name: 'Flood risk - rain',
    description: 'Estimated Annual Damages caused by flooding due to heavy rain',
    defaultValue: 3
  },
  {
    id: 'od-education',
    name: 'Education',
    description: 'The importance of road segments to get to educational facilities',
    defaultValue: 3
  },
  {
    id: 'od-healthcare',
    name: 'Healthcare',
    description: 'The importance of road segments to get to healthcare facilities',
    defaultValue: 3
  }
] : [
  {
    id: 'criticalityScore',
    name: 'Network criticality',
    defaultValue: 3
  },
  {
    id: 'aadtScore',
    name: 'Annual Average Daily Traffic',
    defaultValue: 3
  }
];

function getIndicatorsMeta () {
  return indicators;
}

function getIndicatorsIds () {
  return indicators.map(i => i.id);
}

module.exports = {
  indicators,
  getIndicatorsMeta,
  getIndicatorsIds
};
