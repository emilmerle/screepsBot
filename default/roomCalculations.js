var constants = require("level");

module.exports = {

    initializeMemory: function() {
        //initializing memory objects for every room
        for(var roomName in Game.rooms){
            if(!Memory[roomName]){
                console.log("Initializing Memory for room ", roomName);
                Memory[roomName] = {};
                Memory[roomName].name = roomName;
                //Memory[room].hasSpawn = hasSpawn;
                //Memory[room].spawnQueue = [];
            } else {
                //console.log(Memory[room].name);
            }
        }
    },

    saveAllSpawns: function() {
        var allSpawns = [];
        var allRoomsSpawns = [];
        var spawns;
        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];
            spawns = room.find(FIND_MY_SPAWNS);
            for (const spawnName in spawns) {
                allRoomsSpawns.push(spawns[spawnName].id);
                allSpawns.push(spawns[spawnName].id);
            }
            Memory[roomName].allSpawns = allRoomsSpawns;
            allRoomsSpawns = [];
        }
        Memory.allSpawns = allSpawns; 
    },

    calculatePathsToSources: function() {
        var room;
        for(var roomName in Game.rooms){
            room = Game.rooms[roomName];

            var source;
            for (const sourceId in Memory[roomName].sources) {
                source = Game.getObjectById(Memory[roomName].sources[sourceId]);

                var spawn;
                for (const spawnId in Memory[roomName].allSpawns) {
                    spawn = Game.getObjectById(Memory[roomName].allSpawns[spawnId]);
                    var path = room.findPath(source.pos, spawn.pos);
                    console.log(path); 
                }
            }
        }
    },

    // TODO
    calculateCreepNumber: function() {
        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];
            
            constants.creeps.staticHarvester[1] = Memory[roomName].sources.length;
        }
    },

    saveAllAvailableRooms: function() {
        var rooms = Game.rooms;
        Memory.rooms = Object.keys(rooms);
    },

    saveAllDamagedStructures: function() {
        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];
            var structures;
            structures = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax);
                }
            });
            
            Memory[roomName].damagedStructures = Object.values(structures).map(x => x.id);
        }
        
    },

    // TODO: filter roads
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
};
