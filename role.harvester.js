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
            var harvestFinished = harvestModule.ownHarvest(creep, 0);
            if(harvestFinished != 1){
                harvestFinished = harvestModule.ownHarvestFromContainer(creep);
            }
            if(harvestFinished != 1){
                creep.moveTo(Game.flags.CollectionPoint, {visualizePathStyle: {stroke: 'rgba(255,255,255,0.8)'}});
            }
        }
	}
};

module.exports = roleHarvester;