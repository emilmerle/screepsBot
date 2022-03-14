var harvestModule = require("harvestModule");
var transferModule = require("transferModule");
var buildingModule = require("buildingModule");
var funnyFunctions = require("funnyFunctions");

var roleStarter = {

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
            if (creep.room.energyAvailable === creep.room.energyCapacityAvailable) {
                var text = "I'm friendly to everyone";
                if (creep.room.controller.sign.text != text) {
                    funnyFunctions.signMyController(creep, text);
                }
                buildingModule.upgradeRoomController(creep);
            } else {
                transferModule.transferEnergy(creep);
                //transferModule.transferMinerals(creep);
            }
        } else {
            if(Memory[creep.room.name].droppedEnergy.length) {
				harvestModule.pickupClosestDroppedEnergy(creep);
			} else if (Memory[creep.room.name].otherEnergy.length) {
				harvestModule.lootEnergy(creep);
			} else if (Memory[creep.room.name].energyStorage != null) {
				harvestModule.harvestClosestStorage(creep);
			} else if (Memory[creep.room.name].energyContainers.length) {
				harvestModule.harvestClosestContainer(creep);
			} else {
				harvestModule.harvestEnergySources(creep);
			}
            creep.say('🚰');
        }
	}
};

module.exports = roleStarter;