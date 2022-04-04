var harvestModule = require("harvestModule");
var transferModule = require("transferModule");

var roleExtractor = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() === 0) {
	        creep.memory.working = true;
	    }

	    if(creep.memory.working) {
            transferModule.transferMinerals(creep);
            creep.say("💾");
        }
        else {
            // only if there ate minerals and at least one extractor
            // maybe needs rework, because found minerals could not have an extractor
            if (Memory[creep.room.name].minerals.length && Memory[creep.room.name].extractors.length) {
                harvestModule.harvestClosestMineral(creep);
                creep.say("💎");
            }
        }
	}
};

module.exports = roleExtractor;