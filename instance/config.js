module.exports = {
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
  }
};
