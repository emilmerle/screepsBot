var roleExplorer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //own modules
        var harvestModule = require("harvestModule");
        var transferModule = require("transferModule");

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
                var transferingFinished = transferModule.ownMineralTransfering(creep);
                //console.log(harvestFinished);
                transferingFinished = transferModule.ownTransfering(creep);

                if(transferingFinished != 1){
                    creep.moveTo(Game.flags.CollectionPoint);
                }
            }
        } else {
            if(creep.room.name == "W3S8"){
                var target = creep.pos.findClosestByRange(Game.map.findExit("W3S8", "W2S8"));
                creep.moveTo(target);
            } else {
                //trying to harvest energy from container or Storage
                var harvestFinished = harvestModule.ownHarvest(creep, 0);
                /*
                if(harvestFinished != 1){
                    creep.moveTo(Game.flags.CollectionPoint);
                }
                */
            }
        }
	}
};

module.exports = roleExplorer;