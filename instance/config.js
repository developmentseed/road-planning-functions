module.exports = {
  // Design standard in years for which a road / bridge is built to last.
  // Should be a Return Period available in the flood array
  ROAD_DESIGNSTANDARD: 20,
  BRIDGE_DESIGNSTANDARD: 100,
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
  // In USD per meter.
  // Based on 'structure'
  repairCostBridge: {
    BA: 44000,
    'Dalle BA': 44000,
    MIXTE: 44000,
    'Pont à tablier': 44000,
    'Pont Bailey': 44000,
    'Pont Caisson': 44000,
    'Pont Uni Bridge': 44000,
    'Poutres principales': 44000,
    'PSI-BA': 44000,
    'PSI-DA': 44000,
    'PSI-DA   biais': 44000,
    VIPP: 44000,
    Voûte: 44000
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
  // Cost of each of the interventions. Units are:
  //   - usd/km for general interventions
  //   - usd/meters for bridges
  interventionCost: {
    general: {
      'rehab-earth': 50000,
      'upgrade-stabilized-soil': 150000,
      'rehab-stabilized-soil': 100000,
      'upgrade-asphalt': 300000,
      'rehab-asphalt': 200000
    },
    bridges: {
      BA: 44000,
      'Dalle BA': 44000,
      MIXTE: 44000,
      'Pont à tablier': 44000,
      'Pont Bailey': 44000,
      'Pont Caisson': 44000,
      'Pont Uni Bridge': 44000,
      'Poutres principales': 44000,
      'PSI-BA': 44000,
      'PSI-DA': 44000,
      'PSI-DA   biais': 44000,
      VIPP: 44000,
      Voûte: 44000
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
  },
  // Flood repair time in hours / km. Depends on three factors:
  //  - severity of the flood (low, medium, high)
  //  - seasonality of road (all-weather, dry-weather)
  //  - surface type (asphalt, stabilized-soil, earth)
  repairTime: {
    low: {
      'all-weather': {
        asphalt: 168,
        'stabilized-soil': 168,
        earth: 168
      },
      'dry-weather': {
        asphalt: 1440,
        'stabilized-soil': 1440,
        earth: 1440
      }
    },
    medium: {
      'all-weather': {
        asphalt: 336,
        'stabilized-soil': 336,
        earth: 336
      },
      'dry-weather': {
        asphalt: 2160,
        'stabilized-soil': 2160,
        earth: 2160
      }
    },
    high: {
      'all-weather': {
        asphalt: 1056,
        'stabilized-soil': 1056,
        earth: 1056
      },
      'dry-weather': {
        asphalt: 4320,
        'stabilized-soil': 4320,
        earth: 4320
      }
    }
  }
};
