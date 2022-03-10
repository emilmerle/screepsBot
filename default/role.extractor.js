var harvestModule = require("harvestModule");
var transferModule = require("transferModule");

var roleExtractor = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() === 0) {
	        creep.memory.working = true;
	        creep.say('transfering');
	    }

	    if(creep.memory.working) {
            transferModule.transferMinerals(creep);
        }
        else {
            harvestModule.harvestClosestMineral(creep);
        }
	}
};

module.exports = roleExtractor;