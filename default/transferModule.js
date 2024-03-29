module.exports = {

    /**
     * function for transfering energy to spawn and extensions or containers and towers and storage
     * 
     * @param {Object} creep creep that should transfer energy
     * 
     * TODO: more efficient filtering and sorting 
     */
    transferEnergy: function(creep) {
        //searches spawns that have less than max energy in the room the creep is in and stores them in targets[]
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        //if the spawns are at max energy
        if (targets.length == 0) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        }
        //if the spawn and extensions are at max energy it filters tower in the room
        if (targets.length == 0) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_TOWER)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        }
        //if the spawn and extensions and the towers are at max energy it filters the storage in the room
        if (targets.length == 0) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_STORAGE)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        }

        //transfering the energy to the targets
        if (targets.length) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
            creep.memory.target = targets[0];
        }
    },

    /**
     * function for transferring minerals into the storage on the room the creep is in
     * 
     * @param {Object} creep creep that should transfer minerals
     */
    transferMinerals: function(creep){
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_STORAGE)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if(targets.length){
            var ret;
            for(const resourceType in creep.carry) {
                ret = creep.transfer(targets[0], resourceType);
                /*
                if(resourceType != RESOURCE_ENERGY){
                    ret = creep.transfer(targets[0], resourceType);
                    console.log(resourceType);
                }
                */
            }

            if (ret === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
            
            creep.memory.target = targets[0];
        }
    }
};