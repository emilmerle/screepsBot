var roleRoadbuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //own harvest function
        var harvestModule = require("harvestModule");
        var buildingModule = require("buildingModule");
        var transferModule = require("transferModule");

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build road');
        }

        if(creep.memory.building) {
            var buildingFinished = buildingModule.ownRoadBuilding(creep);
            if(buildingFinished != 1){
                buildingFinished = transferModule.ownTransfering(creep);
            }
            if(buildingFinished != 1) {
                creep.moveTo(Game.flags.CollectionPoint);
            }
        }
        else {
            var harvestFinished = harvestModule.ownHarvestFromContainer(creep);
            if(harvestFinished != 1){
                harvestFinished = harvestModule.ownHarvestFromStorage(creep);
            }
            if(harvestFinished != 1){
                creep.moveTo(Game.flags.CollectionPoint);
            }
        }
    }
};

module.exports = roleRoadbuilder;