module.exports = {
  // Design standard in years for which a road is built to last.
  ROAD_DESIGNSTANDARD: 20,
  // Available road attributes
  roadAttr: [
    {
      key: 'seasonality',
      values: [
        'all-weather',
        'dry-weather',
        'not-passable'
      ],
      default: 'dry-weather'
    },
    {
      key: 'surface',
      values: [
        'asphalt',
        'stabilized-soil',
        'earth'
      ],
      default: 'earth'
    },
    {
      key: 'width',
      values: [
        'large',
        'medium',
        'small'
      ],
      default: 'small'
    },
    {
      key: 'type',
      values: [
        'RN',
        'RD',
        'RC',
        'RA',
        'RU',
        'RI'
      ],
      default: 'RI'
    }
  ],
  // Default road attributes
  defaultRoadAttr: [
    {
      key: 'seasonality',
      value: 'dry-weather'
    },
    {
      key: 'surface',
      value: 'earth'
    },
    {
      key: 'width',
      value: 'small'
    }
  ],
  // Costs are specified for roads with width = small.
  // This multiplier is used to calculate costs for medium and large width roads.
  widthMultiplier: {
    small: 1,
    medium: 1.5,
    large: 2
  },
  // Repair costs of a road after flooding.
  // Amount in $ per km, for a small width road.
  repairCostRoad: {
    low: {
      earth: {
        'all-weather': 10,
        'dry-weather': 10,
        'not-passable': 10
      },
      'stabilized-soil': {
        'all-weather': 10,
        'dry-weather': 10,
        'not-passable': 10
      },
      asphalt: {
        'all-weather': 10,
        'dry-weather': 10,
        'not-passable': 10
      }
    },
    medium: {
      earth: {
        'all-weather': 10,
        'dry-weather': 10,
        'not-passable': 10
      },
      'stabilized-soil': {
        'all-weather': 10,
        'dry-weather': 10,
        'not-passable': 10
      },
      asphalt: {
        'all-weather': 10,
        'dry-weather': 10,
        'not-passable': 10
      }
    },
    high: {
      earth: {
        'all-weather': 10,
        'dry-weather': 10,
        'not-passable': 10
      },
      'stabilized-soil': {
        'all-weather': 10,
        'dry-weather': 10,
        'not-passable': 10
      },
      asphalt: {
        'all-weather': 10,
        'dry-weather': 10,
        'not-passable': 10
      }
    }
  },
  // Maintenance values for the road agency:
  //  - recurrent are annual costs per kilometer
  //  - periodic are costs per kilometer which occur at the interval
  //  - interval in years
  maintenanceCostRoad: {
    earth: {
      recurrent: 1000,
      periodic: 10000,
      interval: 2
    },
    'stabilized-soil': {
      recurrent: 5000,
      periodic: 20000,
      interval: 5
    },
    asphalt: {
      recurrent: 10000,
      periodic: 100000,
      interval: 10
    }
  },
  interventionCost: {
    general: {
      'rehab-earth': 50000,
      'upgrade-stabilized-soil': 150000,
      'rehab-stabilized-soil': 100000,
      'upgrade-asphalt': 300000,
      'rehab-asphalt': 200000
    }
  },
  ruc: {
    // IMPORTANT:
    // There must be a match between the RUC in the instance/config and the
    // ruc-profile used by OSRM. There's some duplication in the logic because
    // they're different technologies. Be sure to always update both files.
    type: {
      RN: 0.1,
      RD: 0.15,
      RC: 0.20,
      RA: 0.25,
      RU: 0.30,
      RI: 0.40,
      // Default is the highest value.
      default: 0.40
    },
    seasonalityPenalty: {
      'all-weather': 0,
      'dry-weather': 0.1,
      // 'non-passable': BLOCK
      // Default is the highest value.
      default: 0.1
    },
    surfacePenalty: {
      asphalt: 0,
      'stabilized-soil': 0.1,
      earth: 0.2,
      // Default is the highest value.
      default: 0.2
    }
  },
  defaultAADT: {
    RN: 300,
    RD: 200,
    RC: 100,
    RA: 50,
    RU: 30,
    RI: 10,
    // Default in case road type is not available.
    default: 10
  }
};
