var roleExplorer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //own modules
        var harvestModule = require("harvestModule");

        var target = creep.pos.findClosestByRange(creep.room.find(FIND_EXIT_RIGHT));
        //console.log(target);
        creep.moveTo(target);
	}
};

module.exports = roleExplorer;