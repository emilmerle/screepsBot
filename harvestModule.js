module.exports = {

    /**
     * function to harvest energy from sources in the room the creep is in
     * 
     * @param {Object} creep creep that should harvest energy
     * @param {Number} targetNumber index of source the creep should go to
     * @returns {Number} 1 if harvestable energy is found in the room, -1 else
     */

        //TODO: calculate the source index automatically
        //maybe: (creep.name[creep.name.length-1] % 2)
    ownHarvest: function(creep, targetNumber) {
        var sources = creep.room.find(FIND_SOURCES);
        //adjusts the targetSource variable if the targetNumber was too high
        var targetSource = (sources.length-1 < targetNumber) ? sources.length-1 : targetNumber;
        //console.log(targetSource);
        

        if(sources.length) {
            if(creep.harvest(sources[targetSource]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[targetSource]);
                return 1;
            } else if(creep.harvest(sources[targetSource]) === ERR_NOT_ENOUGH_RESOURCES){
                return -1;
            } else {
                return 1;
            }
        } else {
            //only when there is no source with energy in the room
            sources = creep.room.find(FIND_DROPPED_RESOURCES);
            if(sources.length){
                if(creep.pickup(sources[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                    return 1;
                } else {
                    return 1;
                }
            } else {
                return -1;
            }
        }
    },

    /**
     * Function for a creep that should harvest energy from the source and drop it immediately
     * @param {Object} creep creep that should harvest 
     * @param {Number} sourceIndex index of source that should be harvested from
     */
    ownHarvestAndDrop: function(creep, sourceIndex){
        var sources = creep.room.find(FIND_SOURCES);
    },

    /**
     * function for withdrawing energy from a container (e.g. if a source is empty)
     * 
     * @param {Object} creep creep that should withdraw from a container
     * @returns {Number} 1 if successfully withdrawn, -1 else
     */
    ownHarvestFromContainer: function(creep) {
        //finding containers in the room
        var sources = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_CONTAINER)
                    && structure.store.getUsedCapacity() > 0;
            }
        });

        if (sources.length) {
            if(creep.withdraw(sources[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
                return 1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    }
};

