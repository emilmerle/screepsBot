var harvestModule = require("harvestModule");
var transferModule = require("transferModule");

var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var hasSpawn = (creep.room.find(FIND_MY_SPAWNS).length > 0) ? true : false;
        //console.log(hasSpawn);
        if(hasSpawn){
            var target = creep.pos.findClosestByRange(creep.room.find(FIND_EXIT_TOP));
            //console.log(target);
            creep.moveTo(target);
            creep.memory.target = "EXIT_TOP";
        } else {
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
            creep.memory.target = creep.room.controller.id;
        }
        
	}
};

module.exports = roleClaimer;