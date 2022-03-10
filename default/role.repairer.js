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
			buildingModule.repairAllStructures(creep);
		}
		else {
            harvestModule.harvestClosestStorage(creep);
			harvestModule.pickupClosestDroppedEnergy(creep);
			harvestModule.lootClosestTombstone(creep);
		}
	}
};
module.exports = roleRepairer;