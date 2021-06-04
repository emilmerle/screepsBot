var roleExtractor = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //own modules
        var harvestModule = require("harvestModule");
        var transferModule = require("transferModule");

        if(creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() === 0) {
	        creep.memory.working = true;
	        creep.say('transfering');
	    }

	    if(creep.memory.working) {
            var transferFinished = transferModule.ownMineralTransfering(creep, RESOURCE_KEANIUM);
            if(transferFinished != 1){
                creep.moveTo(Game.flags.CollectionPoint);
            }
        }
        else {
            var harvestFinished = harvestModule.ownExtract(creep);
            if(harvestFinished != 1){
                creep.moveTo(Game.flags.CollectionPoint);
            }
        }
	}
};

module.exports = roleExtractor;