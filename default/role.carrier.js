var harvestModule = require("harvestModule");
var transferModule = require("transferModule");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //set "working" status to true or false based on energy stored in the creep
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() === 0) {
	        creep.memory.working = true;
	        creep.say('transfering');
	    }

        if(creep.memory.working) {
            transferModule.transferEnergy(creep);
            transferModule.transferMinerals(creep);
        } else {
            //trying to harvest energy from container or Storage
            // container > storage
            harvestModule.ownHarvestFromStorage(creep);
            harvestModule.ownHarvestFromContainer(creep);
        }
	}
};

module.exports = roleHarvester;