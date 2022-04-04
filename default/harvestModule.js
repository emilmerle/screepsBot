module.exports = {

    /**
     * function to harvest energy from a source in the room the creep is in
     * 
     * @param {Object} creep creep that should harvest energy
     */
    harvestEnergySources: function(creep) {
        // choosing a random source for every creep would be good
        // choosing a new source every tick would not work
        var source = Game.getObjectById(Memory[creep.room.name].sources[0]);

        if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        creep.memory.target = source;
    },


    /**
     * function for withdrawing energy from a container (e.g. if a source is empty)
     * 
     * @param {Object} creep creep that should withdraw from a container
     */
    harvestClosestContainer: function(creep) {
        var container = Game.getObjectById(Memory[creep.room.name].energyContainers[0]);

        if(creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(container);
        }
        creep.memory.target = container;
    },


    /**
     * function for withdrawing energy from a storage (e.g. if a source is empty)
     * 
     * @param {Object} creep creep that should withdraw from a storage
     */
    harvestClosestStorage: function(creep){
        //finding storage in the room
        var source = Game.getObjectById(Memory[creep.room.name].storage);
        if(source.store[RESOURCE_ENERGY] > 0) {
            if(creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            creep.memory.target = source;
        } else {
            return;
        }
    },


    /**
     * Function for finding dropped resources that the creep is in
     * 
     * @param {Object} creep Creep that should find dropped resources
     */
    pickupClosestDroppedEnergy: function(creep){
        var energy = Game.getObjectById(Memory[creep.room.name].droppedEnergy[0]);
        
        if(creep.pickup(energy) === ERR_NOT_IN_RANGE) {
            creep.moveTo(energy);
        }
        creep.memory.target = energy;
    },


    /**
     * function for harvesting a mineral,
     * needs an extractor at the mineral source
     * 
     * @param {Object} creep creep that should harvest a mineral
     */
    harvestClosestMineral: function(creep){
        var source = Game.getObjectById(Memory[creep.room.name].minerals[0]);
        
        if(source) {
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            creep.memory.target = source;
        }
    },


    /**
     * function for finding tombstones and withdraw the energy from it
     * 
     * @param {Object} creep creep that should loot the tombstone
     */
    lootEnergy: function(creep) {
        var source = Game.getObjectById(Memory[creep.room.name].otherEnergy[0]);
        
        if(creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        creep.memory.target = source;
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
        creep.memory.target = source;
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
        creep.memory.target = source;
    }
};

