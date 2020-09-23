const _ = require('lodash');
const constConfiguration = require('./config');

/**
 * The improvements file must export:
 * 1) An object of improvements to be used by the app.
 *
 * The improvements object (exported as default) must define 3
 * improvement groups:
 * - general - Improvements to be applied to the roads.
 * - bridges - Improvements to be applied to bridges.
 *
 * Each group consists of an array of improvements that must have the
 * following properties:
 * - id
 *   Unique id of the improvement.
 * - name:
 *   Name of the improvement to show on the interface.
 * - summary:
 *   Name of the improvement for the cost and benefit screen. It supports
 *   different tokens depending on the improvement group:
 *   - general - {len}: length of the segment
 *   - bridges - {len}: length of the bridges {count}: amount of bridges
 * - isEnabled:
 *   Function returning a boolean value depending on whether or not the
 *   improvement is enabled for that specific road segment.
 *   Function signature: isEnabled(road)
 */

const generalImprovCost = (improv, width, length) =>
  constConfiguration.interventionCost.general[improv] *
  constConfiguration.widthMultiplier[width] *
  (length / 1000);

const bridgeImprovCost = (bridges) => {
  if (!bridges) return 0;
  // A single road can have multiple bridges
  return bridges.reduce((sum, bridge) => {
    const cost = constConfiguration.interventionCost.bridges[bridge.structure] * bridge.length;
    return sum + cost;
  }, 0);
}

const improvements = {
  general: [
    {
      id: 'rehab-earth',
      name: 'Rehab earth',
      summary: 'Rehabilitate earth road',
      isEnabled: (road) => road.surface === 'earth',
      calculateCost: (road) =>
        generalImprovCost('rehab-earth', road.width, road.length),
      improveRoad: (road) => ({ ...road, drainageCapacity: 1 })
    },
    {
      id: 'upgrade-stabilized-soil',
      name: 'Upgrade to stabilized soil',
      summary: 'Upgrade to stabilized soil - {len}km',
      isEnabled: (road) => road.surface === 'earth',
      calculateCost: (road) =>
        generalImprovCost('upgrade-stabilized-soil', road.width, road.length),
      improveRoad: (road) => ({
        ...road,
        surface: 'stabilized-soil',
        drainageCapacity: 1
      })
    },
    {
      id: 'rehab-stabilized-soil',
      name: 'Rehab stabilized soil',
      summary: 'Rehabilitate stabilized soil road',
      isEnabled: (road) => road.surface === 'stabilized-soil',
      calculateCost: (road) =>
        generalImprovCost('rehab-stabilized-soil', road.width, road.length),
      improveRoad: (road) => ({ ...road, drainageCapacity: 1 })
    },
    {
      id: 'upgrade-asphalt',
      name: 'Upgrade to asphalt',
      summary: 'Upgrade to asphalt - {len}km',
      isEnabled: (road) =>
        road.surface === 'earth' || road.surface === 'stabilized-soil',
      calculateCost: (road) =>
        generalImprovCost('upgrade-asphalt', road.width, road.length),
      improveRoad: (road) => ({
        ...road,
        surface: 'asphalt',
        drainageCapacity: 1
      })
    },
    {
      id: 'rehab-asphalt',
      name: 'Rehab asphalt',
      summary: 'Rehabilitate asphalt road',
      isEnabled: (road) => road.surface === 'asphalt',
      calculateCost: (road) =>
        generalImprovCost('rehab-asphalt', road.width, road.length),
      improveRoad: (road) => ({ ...road, drainageCapacity: 1 })
    }
  ],
  bridges: [
    {
      id: 'bridges-repair',
      name: 'Clean and repair bridges',
      summary: 'Clean and repair bridges - {count} bridges ({len}m)',
      isEnabled: (road) => !!road.bridges,
      calculateCost: (road) =>
        bridgeImprovCost(road.bridges),
      improveRoad: (road) => road
    }
  ]
};

function getImprovementsMeta () {
  return _.mapValues(improvements, (category) =>
    category.map((imp) => _.pick(imp, 'id', 'name', 'summary'))
  );
}

function calcImprovementCost (group, improvement, road) {
  const impGroup = improvements[group] || [];
  const imp = impGroup.find((i) => i.id === improvement);

  if (!imp) {
    throw new TypeError(`Improvement ${group}.${improvement} does not exist`);
  }

  return imp.calculateCost(road);
}

function calcImprovedRoad (group, improvement, road) {
  const impGroup = improvements[group] || [];
  const imp = impGroup.find((i) => i.id === improvement);

  if (!imp) {
    throw new TypeError(`Improvement ${group}.${improvement} does not exist`);
  }

  return imp.improveRoad(road);
}

module.exports = {
  improvements,
  getImprovementsMeta,
  calcImprovementCost,
  calcImprovedRoad
};
