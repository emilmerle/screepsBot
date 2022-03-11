module.exports = {

    initializeMemory: function() {
        //initializing memory objects for every room
        for(var room in Game.rooms){
            if(!Memory[room]){
                console.log("Initializing Memory for room ", room);
                Memory[room] = {};
                Memory[room].name = room;
                //Memory[room.name].hasSpawn = hasSpawn;
                //Memory[room.name].spawnQueue = [];
            } else {
                //console.log(Memory[roomName].name);
            }
        }
    },

    saveAllAvailableRooms: function() {
        var rooms = Game.rooms;
        Memory.rooms = Object.keys(rooms);
    },

    saveAllDamagedStructures: function() {
        for(var i in Game.rooms){
            var room = Game.rooms[i];
            var structures;
            structures = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax);
                }
            });

            var arr = [];
            for (const key in Object.values(structures)) {
                arr.push(structures[key].id);
            }
            
            Memory[i].damagedStructures = arr;
        }
        
    },

    saveRoadConstructionSites: function() {
        var constructionSites = Game.constructionSites;
        Memory.constructionSites = Object.keys(constructionSites);
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
