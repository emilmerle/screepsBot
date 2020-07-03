module.exports = {

    checkForSpawn: function(room){ 
        return (room.find(FIND_MY_SPAWNS).length > 0);
    },

    checkForStorage: function(room){
        return (room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_STORAGE);
            }
        }).length > 0)
    }
};
