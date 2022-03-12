module.exports = {

    saveAllSources: function() {
        
    },

    savePrimarySources: function() {

    },

    saveStorages: function() {
        for(var roomName in Game.rooms){
            if (Game.rooms[roomName].storage != undefined) {
                Memory[roomName].storage = Game.rooms[roomName].storage.id;
            } else {
                Memory[roomName].storage = null;
            }
        }
    },

    saveContainers: function() {

        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];
            var containers = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            });

           Memory[roomName].containers = Object.values(containers).map(x => x.id);
        }

        
    },

    saveOtherSources: function() {
        
    },

    saveMinerals: function() {
        FIND_MINERALS;
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