var harvestModule = require("harvestModule");
var buildingModule = require("buildingModule");

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		// switch between building and harvesting mode
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    	if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

		// @TODO
		// Some weird moving while building
	    if(creep.memory.building) {
			// I dont know if that works or in which order it would be performed!
			// best would be build, if not then repair and if not then upgrade
			buildingModule.upgradeRoomController(creep);
			buildingModule.repairAllStructures(creep);
			buildingModule.buildAllContructionSites(creep);
	    }
	    else {
			harvestModule.harvestAllSources(creep);
			harvestModule.pickupClosestDroppedEnergy(creep);
			harvestModule.harvestClosestStorage(creep);
			creep.moveTo(Game.flags.CollectionPoint);
	    }
	}
};

module.exports = roleBuilder;