
module.exports = {

    saveAllAvailableRooms: function() {
        var rooms = Game.rooms;
        Memory.rooms = Object.keys(rooms);
    },

    saveAllDamagedStructures: function() {

        var structures = Game.structures;
        // roads are not in here
        Memory.damagedStructures = structures;
        structures = Object.entries(structures).map(item => {
            if (item[1].hits < item[1].hitsMax) {
                return item;
            }
        });
        console.log(structures.length);
    },

    saveAllConstructionSites: function() {
        var constructionSites = Game.constructionSites;
        Memory.constructionSites = Object.keys(constructionSites);
    },

    hasSpawn: function(room){ 
        return (room.find(FIND_MY_SPAWNS).length > 0);
    },

    hasStorage: function(room){
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
