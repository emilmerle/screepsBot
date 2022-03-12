var harvestModule = require("harvestModule");
var buildingModule = require("buildingModule");

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		// switch between building and harvesting mode
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
	    }
	    	if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
			if(Memory.constructionSites.length) {
				buildingModule.buildAllContructionSites(creep);
				creep.say("⚒️");
			} else if (Memory[creep.room.name].damagedStructures.length){
				buildingModule.repairAllStructures(creep);
				creep.say('🔧');
			} else {
				buildingModule.upgradeRoomController(creep);
				creep.say('⬆️');
			}
	    }
	    else {
			harvestModule.harvestAllSources(creep);
			harvestModule.pickupClosestDroppedEnergy(creep);
			harvestModule.harvestClosestStorage(creep);
            creep.say('🚰');
	    }
	}
};

module.exports = roleBuilder;