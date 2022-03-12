module.exports = {

    saveAllSources: function() {
        
    },

    saveStorages: function() {
        for(var roomName in Game.rooms){
            Memory[roomName].storage = Game.rooms[roomName].storage.id;
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

    saveHarvestSources: function() {
        
    },

    savePickupSources: function() {
        
    },

    saveWithdrawSources: function() {
        
    }
};