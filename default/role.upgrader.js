var harvestModule = require("harvestModule");
var buildingModule = require("buildingModule");

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            buildingModule.upgradeRoomController(creep);
        }
        else {
            harvestModule.harvestClosestStorage(creep);
        }
	}
};

module.exports = roleUpgrader;