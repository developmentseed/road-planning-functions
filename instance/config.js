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
