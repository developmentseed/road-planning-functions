const config = require('../instance/config');
const { BRIDGE_DESIGNSTANDARD } = require('../instance/config');

/**
 * Calculate expected annual damage (EAD) for damages, using trapezoidal rule.
 *
 * @param  {Array} damages            Array with values for damages for the
 *                                    return periods.
 * @param {Number} damages.rp        Return period
 * @param {Number} damages.damage    Damange for the return period
 *
 * @return {Number}
 */
function calculateEAD (damages) {
  const totalDamage = damages.reduce((sum, d, idx) => {
    // Ignore if last rp
    if (idx === damages.length - 1) return sum;

    const nextDamage = damages[idx + 1];
    return (
      sum + (1 / d.rp - 1 / nextDamage.rp) * (d.damage + nextDamage.damage)
    );
  }, 0);

  return totalDamage / 2;
}

/**
 * Calculate damage to a road segment due to a flood event.
 * Damage costs on road surface is based on 3 thresholds of water above
 * surface. Roads are assumed to built at ground level (no embankment).
 *
 * @param {Object} road                 Object with road properties
 * @param {Number} road.length          Road segment length in meters
 * @param {Number} floodDepth           Flood depth in meters
 *
 * @return {Number}
 */
function calculateRoadDamage (road, floodDepth) {
  // No damage if waterlevel is below 0.2 meters
  if (floodDepth < 0.2) return 0;

  let severity = 'low';
  if (floodDepth > 0.5 && floodDepth <= 1.5) severity = 'medium';
  if (floodDepth > 1.5) severity = 'high';

  return (
    road.length *
    config.repairCostRoad[severity][road.surface][road.seasonality] *
    config.widthMultiplier[road.width]
  );
}

/**
 * Calculate expected annual damage (EAD) for a road, for a series of return
 * periods.
 *
 * @param {Object} road                 Road properties
 * @param {Array} floods                Array with flood depths
 * @param {Number} floods[].rp          Return period
 * @param {Number} floods[].depth       Flood depth in meter
 *
 * @return {Number}
 */
function calculateRoadEAD (road, floods) {
  const damages = floods.map((f) => ({
    rp: f.rp,
    damage: calculateRoadDamage(road, f.depth)
  }));
  return calculateEAD(damages);
}

/**
 * Calculate damage to a bridge for a single return period.
 * Damage is modeled as a % of total replacement cost based on the difference
 * between the observed water level and the water level the structure was
 * designed for.
 *
 * @param {Object} bridge               Object with bridge properties
 * @param {Number} floodDepth           Flood depth in meters
 * @param {Number} waterLevelDesign     The water level this bridge was designed for
 * @param {Number} conditionRate        Condition rate of the bridge
 *
 * @return {Number}
 */
function calculateBridgeDamage (bridge, floodDepth, waterLevelDesign, conditionRate) {
  const drainageCapacity = 0.7;

  const repairCost = config.repairCostBridge[bridge.structure] * bridge.length;

  // Return 0 if damage is negative. Happens when waterLevel doesn't reach
  // above waterLevelDesign * drainageCapacity
  return Math.max(0, (floodDepth - waterLevelDesign * drainageCapacity) * 1 / conditionRate * repairCost);
}

/**
 * Calculate expected annual damage (EAD) for a bridge, for a series of return
 * periods.
 *
 * @param  {Object} bridge              Object with bridge properties
 * @param {Number} conditionRate        Condition rate of the bridge
 * @param {Array} floods                Array with flood depths
 * @param {Number} floods[].rp          Return period
 * @param {Number} floods[].depth       Flood depth in meter
 *
 * @return {Number}
 */
function calculateBridgeEAD (bridge, conditionRate, floods) {
  // Determine the water level this bridge was designed for
  const floodRp = floods.find(f => f.rp === BRIDGE_DESIGNSTANDARD);
  const waterLevelDesign = floodRp ? floodRp.depth : 0;

  const damages = floods.map((f) => ({
    rp: f.rp,
    damage: calculateBridgeDamage(bridge, conditionRate, f.depth, waterLevelDesign)
  }));
  return calculateEAD(damages);
}

module.exports = {
  calculateEAD,
  calculateRoadDamage,
  calculateRoadEAD,
  calculateBridgeDamage,
  calculateBridgeEAD
};
