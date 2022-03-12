var harvestModule = require("harvestModule");

var roleStaticHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        harvestModule.harvestEnergySources(creep);
	}
};

module.exports = roleStaticHarvester;