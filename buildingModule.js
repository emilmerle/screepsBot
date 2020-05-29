module.exports = {

    ownBuilding: function(creep) {
        var buildingTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (buildingTargets.length) {
            if (creep.build(buildingTargets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(buildingTargets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        //has to be edited because to complex for one function
        else {
            buildingTargets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits < structure.hitsMax);
                }
            });
            if (buildingTargets.length) {
                if (creep.repair(buildingTargets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildingTargets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                creep.moveTo(Game.flags.CollectionPoint, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },

    ownRepairing: function(creep) {
        var repairingTargets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits < structure.hitsMax);
                }
            });
            if (repairingTargets.length) {
                if (creep.repair(buildingTargets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildingTargets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                creep.moveTo(Game.flags.CollectionPoint, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
    },
};

