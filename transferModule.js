module.exports = {

    /**
     * function for transfering energy to spawn and extensions or containers and towers and storage
     * 
     * @param {Object} creep creep that should transfer energy
     * @returns {Number}    1 if the creep succesfully transfers or moves to a structure, -1 else
     */
    ownTransfering: function(creep) {
        //searches spawn and extensions that have less than max energy in the room the creep is in and stores them in targets[]
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        //if the spawn and extensions are at max energy it filters the containers and tower in the room
        if (targets.length == 0) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_STORAGE)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        }

        if (targets.length) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    }
};