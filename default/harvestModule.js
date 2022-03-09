module.exports = {

    /**
     * function to harvest energy from a source in the room the creep is in
     * 
     * @param {Object} creep creep that should harvest energy
     */
    harvestAllSources: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);

        if(sources.length) {
            // pick random source from all sources
            // not working because every tick an different source is picked
            var targetSource = Math.floor(Math.random() * sources.length)
            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    },


    /**
     * function for withdrawing energy from a container (e.g. if a source is empty)
     * 
     * @param {Object} creep creep that should withdraw from a container
     */
    harvestClosestContainer: function(creep) {
        //finding containers in the room
        var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_CONTAINER)
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity();
            }
        });

        if (source) {
            if(creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    },


    /**
     * function for withdrawing energy from a storage (e.g. if a source is empty)
     * 
     * @param {Object} creep creep that should withdraw from a storage
     */
    harvestClosestStorage: function(creep){
        //finding storage in the room
        var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_STORAGE)
                    && structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity();
            }
        });

        if(source) {
            if(creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    },


    /**
     * Function for finding dropped resources that the creep is in
     * 
     * @param {Object} creep Creep that should find dropped resources
     */
    pickupClosestDroppedEnergy: function(creep){
        var energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
            filter: (resource) => {
                return (resource.resourceType === RESOURCE_ENERGY);
            }
        });
        
        if(energy) {
            if(creep.pickup(energy) === ERR_NOT_IN_RANGE) {
                creep.moveTo(energy);
            }
        }
    },


    /**
     * function for harvesting a mineral,
     * needs an extractor at the mineral source
     * 
     * @param {Object} creep creep that should harvest a mineral
     */
    harvestClosestMineral: function(creep){
        var source = creep.pos.findClosestByRange(FIND_MINERALS);
        if(source) {
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    },


    /**
     * function for finding tombstones and withdraw the energy from it
     * 
     * @param {Object} creep creep that should loot the tombstone
     */
    lootClosestTombstone: function(creep) {
        var source = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
            filter: (structure) => {
                return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        
        if(source) {
            if(creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    },

    /**
     * function for harvesting from a given source
     * 
     * @param {Object} creep creep that should harvest the source
     * @param {Object} source source the creep should harvest
     */
    harvestSource: function(creep, source) {
        if(creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    },


    /**
     * function for withdrawing from a given source
     * 
     * @param {Object} creep creep that should withdraw from the source
     * @param {Object} source source the creep should withdraw from
     */
    withdrawSource: function(creep, source) {
        if(creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
};

