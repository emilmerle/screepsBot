module.exports = {
    /**
     * building function for building the construction sites in the room it is in
     * 
     * @param {Object} creep creep that should build something
     */
    buildAllContructionSites: function(creep) {
        // filtering only own construction sites
        /*
        var buildingTargets = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {
            filter: (constructionSite) => {
                return (constructionSite.my === true);
            }
        });
        */

        //build the first construction site from the memory
        var i = 0;
        var target;
        do {
            target = Game.getObjectById(Memory.constructionSites[i]);
            i++;
        } while (target == null);
        
        if (creep.build(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        creep.memory.target = target.id;
    },


    /**
     * building function for building the roads in the room it is in
     * 
     * @param {Object} creep creep that should build something
     */
    buildAllRoads: function(creep){
        var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD);
            }
        });
        if (targets.length) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
            creep.memory.target = targets[0].id;
        }
    },


    /**
     * repairing function to repair structures that have less than max Hits in the room it is in
     * 
     * @param {Object} creep creep that should repair something
     */
    repairAllStructures: function(creep) {
        // repair first damaged structure in memory
        var target = Game.getObjectById(Memory[creep.room.name].damagedStructures[0]);
    
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        creep.memory.target = target.id;
    
    },


    /**
     * function for upgrading the own controller in the room the creep is in
     * 
     * @param {Object} creep creep that should upgrade
     */
    upgradeRoomController: function(creep) {
        if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
        creep.memory.target = creep.room.controller.id;
    },


    /**
     * function for building a given construction site
     * 
     * @param {Object} creep creep that should build
     * @param {Object} constructionSite construction site the creep should build
     */
    buildConstructionSite: function(creep, constructionSite){
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionSite);
        }
        creep.memory.target = constructionSite.id;
    },


    /**
     * function for repairing a given structure
     * 
     * @param {Object} creep creep that should repair
     * @param {Object} structure structure the creep should repair
     */
    repairStructure: function(creep, structure){
        if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }
        creep.memory.target = structure.id;
    }
};

