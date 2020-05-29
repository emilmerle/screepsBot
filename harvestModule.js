module.exports = {

    ownHarvest: function(creep, targetNumber) {
        var sources = creep.room.find(FIND_SOURCES);
        
        //can decide to which source if more than one source is in the room (not good because every tick = new source)
        var targetSource = Math.floor(Math.random() * Math.floor(sources.length));
        //console.log(targetSource);

        //when the source has no energy left
        if (sources[targetNumber].energy == 0) {
            targetNumber = 0;
            sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY] > 0);
                }
            });
        }

        if(sources.length) {
            if(sources[targetNumber].structureType === STRUCTURE_CONTAINER) {
                if(creep.withdraw(sources[targetNumber], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[targetNumber], {visualizePathStyle: {stroke: '#f9ff52'}});
                }
            } else {
                if(creep.harvest(sources[targetNumber]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[targetNumber], {visualizePathStyle: {stroke: '#f9ff52'}});
                }
            }
        } else {
            //when there is no active source in the room
            sources = creep.room.find(FIND_DROPPED_RESOURCES);

            if(creep.harvest(sources[targetNumber]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[targetNumber], {visualizePathStyle: {stroke: '#f9ff52'}});
            }
        }
    }
};

