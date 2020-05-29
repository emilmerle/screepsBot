var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //own harvest function
        var harvestModule = require("harvestModule");
        var transferModule = require("transferModule");

        //set status to "building" or "harvesting"
        if(creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.harvesting = false;
            creep.say('🔄 harvest');
	    }
	    	if(!creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
	        creep.memory.harvesting = true;
	        creep.say('transfering');
	    }

        if(creep.memory.harvesting) {
            transferModule.ownTransfering(creep);
        } else {
            harvestModule.ownHarvest(creep, 0);
        }
	}
};

module.exports = roleHarvester;