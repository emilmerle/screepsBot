var roleRepairer = {

	/** @param {Creep} creep **/
	run: function (creep) {

		//own harvest function
        var harvestModule = require("harvestModule");

		if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
			creep.memory.building = true;
			creep.say('🚧 repair');
		}

		if(creep.memory.building) {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return ((structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_ROAD) &&
							structure.hits < structure.hitsMax
					);
				}
			});

			//console.log(targets[0]);

			if (targets.length) {
				if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ff00d1'}});
				}
			} else {
				creep.moveTo(Game.flags.CollectionPoint, {visualizePathStyle: {stroke: '#ff00d1'}});
			}
		}
		else {
			harvestModule.ownHarvest(creep, 0);
		}
	}
};
module.exports = roleRepairer;