const roadsEad = require('./roads/ead');
const roadsUtils = require('./roads/utils');

module.exports = {
  calculateRoadEAD: roadsEad.calculateRoadEAD,
  setDefaultRoadAttributes: roadsUtils.setDefaultAttributes
};
