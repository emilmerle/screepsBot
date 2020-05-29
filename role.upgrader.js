var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //own harvest function
        var harvestModule = require("harvestModule");

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#38ff00'}});
            }
        }
        else {
            var harvestFinished = harvestModule.ownHarvest(creep, 1);
            if(harvestFinished != 1){
                harvestFinished = harvestModule.ownHarvestFromContainer(creep);
            }
            if(harvestFinished != 1){
                creep.moveTo(Game.flags.CollectionPoint, {visualizePathStyle: {stroke: 'rgba(255,255,255,0.8)'}});
            }
        }
	}
};

module.exports = roleUpgrader;