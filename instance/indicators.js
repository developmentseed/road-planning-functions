const indicators = process.env.NODE_ENV === 'production' || process.env.USE_PROD_DATA ? [
  // {
  //   id: 'aadtScore', // Equivalent to the filename
  //   stateKey: 'ia', // The state key is used when saving data to the url
  //   name: 'Annual Average Daily Traffic',
  //   defaultValue: 3
  // },
  {
    id: 'flood-ead-fu',
    stateKey: 'eadf',
    name: 'Flood risk - scour',
    description: 'Estimated Annual Damages due to river flooding',
    defaultValue: 3
  },
  {
    id: 'flood-ead-pu',
    stateKey: 'eadp',
    name: 'Flood risk - rain',
    description: 'Estimated Annual Damages caused by flooding due to heavy rain',
    defaultValue: 3
  }
] : [
  {
    id: 'criticalityScore',
    // The state key is used when saving data to the url.
    // Not sure if it should come from the api... maybe a random mapping
    // could be created on the frontend?
    stateKey: 'ic',
    name: 'Network criticality',
    defaultValue: 3
  },
  {
    id: 'aadtScore',
    stateKey: 'ia',
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
