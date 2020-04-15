const indicators = [
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
