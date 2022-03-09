module.exports = {
    /**
     * building function for building the construction sites in the room it is in
     * 
     * @param {Object} creep creep that should build something
     */
    buildAllContructionSites: function(creep) {
        var buildingTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (buildingTargets.length) {
            if (creep.build(buildingTargets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(buildingTargets[0]);
            }
        }
    },


    /**
     * building function for building the roads in the room it is in
     * 
     * @param {Object} creep creep that should build something
     */
    buildAllRoads: function(creep){
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD);
            }
        });
        if (targets.length) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
    },


    /**
     * repairing function to repair structures that have less than max Hits in the room it is in
     * 
     * @param {Object} creep creep that should repair something
     */
    repairAllStructures: function(creep) {
        var repairingTargets = creep.room.find(FIND_STRUCTURES);
        if (repairingTargets.length) {
            if (creep.repair(repairingTargets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(repairingTargets[0]);
            }
        }
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
    }
};

