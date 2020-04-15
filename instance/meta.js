const { getImprovementsMeta } = require('./improvements');
const { getIndicatorsMeta } = require('./indicators');

const meta = {
  name: 'Haiti Road Planning',
  bbox: [
    [-74.559295, 17.934295],
    [-71.560028, 20.120398]
  ],
  center: [-73.056335, 19.025770],
  provinces: [
    {
      id: 'HT-N',
      name: 'Haiti North',
      bbox: [
        [-73.52050, 18.62542],
        [-71.58142, 20.11783]
      ],
      roadCount: 150
    },
    {
      id: 'HT-S',
      name: 'Haiti South',
      bbox: [
        [-74.52026, 17.97350],
        [-74.52026, 17.97350]
      ],
      roadCount: 149
    }
  ],
  indicators: getIndicatorsMeta(),
  improvements: getImprovementsMeta(),
  benefits: [
    {
      id: 'userCost',
      name: 'Decreased user cost'
    },
    {
      id: 'maintenanceCost',
      name: 'Decreased maintenance cost'
    }
  ]
};

module.exports = {
  meta
};
