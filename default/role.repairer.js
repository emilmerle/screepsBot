var harvestModule = require("harvestModule");
var buildingModule = require("buildingModule");

var roleRepairer = {

	/** @param {Creep} creep **/
	run: function (creep) {

		if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
			creep.memory.building = true;
			creep.say('🚧 repair');
		}

		if(creep.memory.building) {
			if (Memory[creep.room.name].damagedStructures.length) {
				buildingModule.repairAllStructures(creep);
				creep.say('🔧');
			}
		}
		else {
            if(Memory[creep.room.name].droppedEnergy.length) {
				harvestModule.pickupClosestDroppedEnergy(creep);
			} else if (Memory[creep.room.name].otherEnergy.length) {
				harvestModule.lootEnergy(creep);
			} else if (Memory[creep.room.name].storage != null) {
				harvestModule.harvestClosestStorage(creep);
			} else if (Memory[creep.room.name].containers.length) {
				harvestModule.harvestClosestContainer(creep);
			} else {
				harvestModule.harvestAllSources(creep);
			}
            creep.say('🚰');
		}
	}
};
module.exports = roleRepairer;