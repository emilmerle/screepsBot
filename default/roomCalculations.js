const roomControl = require("./roomControl");

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
    },

    pathSourcesSpawn(room){
        var spawn = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN);
            }
        });

        let goals = _.map(room.find(FIND_SOURCES), function(source) {
            // We can't actually walk on sources-- set `range` to 1 
            // so we path next to it.
            return { pos: source.pos, range: 1 };
        });

        //var ret = PathFinder.search(spawn, goals);
        //console.log(ret);
        //Memory[room.name].testPath = ret;
    },
};
