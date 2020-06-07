var roleRoadbuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //own harvest function
        var harvestModule = require("harvestModule");
        var buildingModule = require("buildingModule");

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build road');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_ROAD);
                }
            });
            if (targets.length) {
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                creep.moveTo(Game.flags.CollectionPoint);
            }
        }
        else {
            var harvestFinished = harvestModule.ownHarvestFromContainer(creep);
            if(harvestFinished != 1){
                creep.moveTo(Game.flags.CollectionPoint);
            }
        }
    }
};

module.exports = roleRoadbuilder;