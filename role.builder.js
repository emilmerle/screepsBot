var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		//own harvest function
		var harvestModule = require("harvestModule");
		var buildingModule = require("buildingModule");

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    	if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        buildingModule.ownBuilding(creep);
	    }
	    else {
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

module.exports = roleBuilder;