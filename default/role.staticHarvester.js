var harvestModule = require("harvestModule");

var roleStaticHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        harvestModule.harvestAllSources(creep);
	}
};

module.exports = roleStaticHarvester;