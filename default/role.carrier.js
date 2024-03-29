var harvestModule = require("harvestModule");
var transferModule = require("transferModule");
var buildingModule = require("buildingModule");

var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //set "working" status to true or false based on energy stored in the creep
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() === 0) {
	        creep.memory.working = true;
	        creep.say('💾');
	    }

        if(creep.memory.working) {
			if (Memory[creep.room.name].freeEnergyStructures.length) {
				transferModule.transferEnergy(creep);
			} else {
				buildingModule.upgradeRoomController(creep);
			}
        } else {
            if(Memory[creep.room.name].droppedEnergy.length) {
				harvestModule.pickupClosestDroppedEnergy(creep);
			} else if (Memory[creep.room.name].otherEnergy.length) {
				harvestModule.lootEnergy(creep);
			} else if (Memory[creep.room.name].energyContainers.length) {
				harvestModule.harvestClosestContainer(creep);
			} else if (Memory[creep.room.name].energyStorage != null) {
				harvestModule.harvestClosestStorage(creep);
			} else {
				harvestModule.harvestEnergySources(creep);
			}
            creep.say('🚰');
        }
	}
};

module.exports = roleCarrier;