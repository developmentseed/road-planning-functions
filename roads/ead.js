const config = require('../instance/config');

/**
 * Calculate expected annual damage (EAD) for damages, using trapezoidal rule.
 *
 * @param  {Array} damages            Array with values for damages for the
 *                                    return periods.
 * @param {Integer} damages.rp        Return period
 * @param {Integer} damages.damage    Damange for the return period
 *
 * @return {Integer}
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
 * @param {Integer} road.length         Road segment length in meters
 * @param {Integer} floodDepth          Flood depth in meters
 *
 * @return {Integer}
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
 * @param {Integer} depths.rp           Return period
 * @param {Integer} depths.depth        Flood depth in meter
 *
 * @return {Integer}
 */
function calculateRoadEAD (road, floods) {
  const damages = floods.map((f) => ({
    rp: f.rp,
    damage: calculateRoadDamage(road, f.depth)
  }));
  return calculateEAD(damages);
}

module.exports = {
  calculateEAD,
  calculateRoadDamage,
  calculateRoadEAD
};
