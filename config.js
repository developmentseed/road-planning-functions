module.exports.default = {
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
  // Amount in $ per km, for a small widt road.
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
  // Flood return periods
  floodRp: [5, 10, 20, 50, 75, 100, 200, 250, 500, 1000]
}
