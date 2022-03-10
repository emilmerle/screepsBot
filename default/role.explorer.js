var harvestModule = require("harvestModule");
var transferModule = require("transferModule");

// TODO: Dont hardcode any roomnames!
// TODO: general structure and logic
var roleExplorer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //set "working" status to true or false based on energy stored in the creep
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() === 0) {
	        creep.memory.working = true;
	        creep.say('transfering');
	    }

        if(creep.memory.working) {
            if(creep.room.name != "W3S8"){
                var target = creep.pos.findClosestByRange(Game.map.findExit(creep.room, "W3S8"));
                creep.moveTo(target);
            } else {
                //transfering stored energy to spawn or other structures
                transferModule.transferEnergy(creep);
                transferModule.transferMinerals(creep);
            }
        } else {
            if(creep.room.name == "W3S8"){
                var target = creep.pos.findClosestByRange(Game.map.findExit("W3S8", "W2S8"));
                creep.moveTo(target);
            } else {
                //trying to harvest energy from container or Storage
                harvestModule.harvestClosestStorage(creep);
                harvestModule.harvestClosestContainer(creep);
            }
        }
	}
};

module.exports = roleExplorer;