const _ = require('lodash');

/**
 * The improvements file must export:
 * 1) An object of improvements to be used by the app.
 *
 * The improvements object (exported as default) must define 3
 * improvement groups:
 * - general - Improvements to be applied to the roads.
 * - culverts - Improvements to be applied to culvers.
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
 *   - culverts - {count}: amount of culverts
 *   - bridges - {len}: length of the bridges {count}: amount of bridges
 * - isEnabled:
 *   Function returning a boolean value depending on whether or not the
 *   improvement is enabled for that specific road segment.
 *   Function signature: isEnabled(road)
 */
// TODO: Review improvement conditions
const improvements = {
  general: [
    {
      id: 'upgrade-asphalt',
      name: 'Upgrade to asphalt',
      summary: 'Upgrade to asphalt - {len}km',
      isEnabled: () => true,
      calculateCost: road => {
        return road.length;
      }
    },
    {
      id: 'upgrade-gravel',
      name: 'Upgrade to gravel',
      summary: 'Upgrade to gravel - {len}km',
      isEnabled: road => road.surface === 'unpaved',
      calculateCost: road => {
        return road.length;
      }
    }
  ],
  culverts: [
    {
      id: 'culverts-repair',
      name: 'Replace culverts',
      summary: 'Clean and repair culverts - {count} culverts',
      isEnabled: road => road.culverts > 0,
      calculateCost: road => {
        return road.length;
      }
    },
    {
      id: 'culverts-replace',
      name: 'Clean and repair culverts',
      summary: 'Replace culverts - {count} culverts',
      isEnabled: road => road.culverts > 0 && road.condition !== 'good',
      calculateCost: road => {
        return road.length;
      }
    }
  ],
  bridges: [
    {
      id: 'bridges-repair',
      name: 'Clean and repair bridges',
      summary: 'Clean and repair bridges - {count} bridges ({len}m)',
      isEnabled: road => !!road.bridges,
      calculateCost: road => {
        return road.length;
      }
    }
  ]
};

function getImprovementsMeta () {
  return _.mapValues(improvements, category =>
    category.map(imp => _.pick(imp, 'id', 'name', 'summary'))
  );
}

function calcImprovementCost (group, improvement, road) {
  const impGroup = improvements[group] || [];
  const imp = impGroup.find(i => i.id === improvement);

  if (!imp) { throw new TypeError(`Improvement ${group}.${improvement} does not exist`); }

  return imp.calculateCost(road);
}

module.exports = {
  improvements,
  getImprovementsMeta,
  calcImprovementCost
};
