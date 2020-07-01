var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //own modules
        var harvestModule = require("harvestModule");
        var transferModule = require("transferModule");

        var hasSpawn = (creep.room.find(FIND_MY_SPAWNS).length > 0) ? true : false;
        //console.log(hasSpawn);
        if(hasSpawn){
            var target = creep.pos.findClosestByRange(creep.room.find(FIND_EXIT_TOP));
            console.log(target);
            creep.moveTo(target);
        } else {
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }
        
	}
};

module.exports = roleClaimer;