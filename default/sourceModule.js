module.exports = {

    saveAllSources: function() {
        
    },

    savePrimarySources: function() {

    },


    saveExtractors: function() {
        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];
            var extractors = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTRACTOR);
                }
            }).map(x => x.id);

            if (extractors.length) {
                Memory[roomName].extractors = extractors;
            } else {
                Memory[roomName].extractors = null;
            }
        }
    },

    saveRoomExtractors: function(roomName){

    },

    saveStorages: function() {
        for(var roomName in Game.rooms){
            var storage = Game.rooms[roomName].storage;
            if (storage != undefined) {
                Memory[roomName].storage = storage.id;
                Memory[roomName].energyStorage = null;
                if (storage.store[RESOURCE_ENERGY] > 0) {
                    Memory[roomName].energyStorage = storage.id;
                }
            } else {
                Memory[roomName].storage = null;
                Memory[roomName].energyStorage = null;
            }
        }
    },

    saveContainers: function() {

        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];
            var allContainers = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            });

            var energyContainers = allContainers.filter(
                x => (x.store[RESOURCE_ENERGY] > 0)
            );

           Memory[roomName].energyContainers = Object.values(energyContainers).map(x => x.id);
           Memory[roomName].allContainers = Object.values(allContainers).map(x => x.id);
        }

        
    },

    saveOtherSources: function() {
        
    },

    saveAllMinerals: function() {
        FIND_MINERALS;
        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];

            // tombstones maybe decay too fast to get them but then drop all resources 
            var minerals = room.find(FIND_MINERALS)
                .map(x => x.id);

           Memory[roomName].minerals = minerals;
        }
    },

    saveRoomMinerals: function(roomName) {

    },

    saveEnergySources: function() {
        // FIND_SOURCES_ACTIVE also possible

        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];
            var sources = room.find(FIND_SOURCES).map(x => x.id);

           Memory[roomName].sources = sources;
        }
        
    },

    saveDroppedEnergy: function() {
        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];
            var droppedEnergy = room.find(FIND_DROPPED_RESOURCES)
                .filter(x => x.resourceType === RESOURCE_ENERGY)
                .map(x => x.id);

           Memory[roomName].droppedEnergy = droppedEnergy;
        }
    },

    saveWithdrawSources: function() {
        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];

            // tombstones maybe decay too fast to get them but then drop all resources 
            var tombstones = room.find(FIND_TOMBSTONES)
                .filter(x => x.store[RESOURCE_ENERGY] > 0)
                .map(x => x.id);
            var ruins = room.find(FIND_RUINS)
                .filter(x => x.store[RESOURCE_ENERGY] > 0)
                .map(x => x.id);

            var arr = [];
            tombstones.forEach(x => arr.push(x));
            ruins.forEach(x => arr.push(x));

           Memory[roomName].otherEnergy = arr;
        }
    }
};