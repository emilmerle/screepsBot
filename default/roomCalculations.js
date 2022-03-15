var constants = require("level");

module.exports = {

    initializeMemory: function() {
        //initializing memory objects for every room
        for(var roomName in Game.rooms){
            if(!Memory[roomName]){
                console.log("Initializing Memory for room ", roomName);
                Memory[roomName] = {};
                Memory[roomName].name = roomName;
                Memory[roomName].energy = {};
                //Memory[room].hasSpawn = hasSpawn;
                //Memory[room].spawnQueue = [];
            } else {
                //console.log(Memory[room].name);
            }
        }
    },

    saveRoomEnergyAvailable: function(roomName) {
        var room = Game.rooms[roomName];
        Memory[roomName].energy.capacity = room.energyCapacityAvailable;
        Memory[roomName].energy.available = room.energyAvailable;
    },

    // still updates memory of rooms
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

    saveRoomSpawns: function(roomName) {
        var room = Game.rooms[roomName];
        var spawns = room.find(FIND_MY_SPAWNS);
        Memory[roomName].allSpawns = Object.values(spawns).map(spawn => spawn.id);
    },

    // should maybe only be called once
    calculateAllPathsToSources: function() {
        var room;
        var arr = [];

        var controller;
        var path;
        var spawn;
        var source;

        for(var roomName in Game.rooms){
            room = Game.rooms[roomName];

            controller = room.controller;
            for (const spawnId in Memory[roomName].allSpawns) {
                spawn = Game.getObjectById(Memory[roomName].allSpawns[spawnId]);

                path = room.findPath(spawn.pos, controller.pos);
                arr.push(Room.serializePath(path));
                
                for (const sourceId in Memory[roomName].sources) {
                    source = Game.getObjectById(Memory[roomName].sources[sourceId]);

                    path = room.findPath(source.pos, spawn.pos);
                    arr.push(Room.serializePath(path));
                }
            }

            Memory[roomName].mainPaths = arr;
        }
    },

    // should be called after spawns and sources are written into memory
    calculateRoomPathsToSources: function(roomName) {
        var room = Game.rooms[roomName];

        var arr = [];
        var controller = room.controller;
        var path;
        var spawn;
        var source;

        for (const spawnId in Memory[roomName].allSpawns) {
            spawn = Game.getObjectById(Memory[roomName].allSpawns[spawnId]);

            path = room.findPath(spawn.pos, controller.pos);
            arr.push(Room.serializePath(path));
            
            for (const sourceId in Memory[roomName].sources) {
                source = Game.getObjectById(Memory[roomName].sources[sourceId]);

                path = room.findPath(source.pos, spawn.pos);
                arr.push(Room.serializePath(path));
            }
        }
        
        Memory[roomName].mainPaths = arr;
    },

    // should maybe only be called once
    buildAllMainPaths: function() {
        for(var roomName in Game.rooms){
            var room = Game.rooms[roomName];

            for (const serializedPath in Memory[roomName].mainPaths) {
                var path = Room.deserializePath(Memory[roomName].mainPaths[serializedPath]);
                
                for (const position in path) {
                    room.createConstructionSite(path[position].x, path[position].y, STRUCTURE_ROAD);
                }
            }
        }
    },

    // should only be called after main pathes are calculated
    buildRoomMainPaths: function(roomName) {
        var room = Game.rooms[roomName];

        var path;
        for (const serializedPath in Memory[roomName].mainPaths) {
            path = Room.deserializePath(Memory[roomName].mainPaths[serializedPath]);
            
            for (const position in path) {
                room.createConstructionSite(path[position].x, path[position].y, STRUCTURE_ROAD);
            }
        }
    },

    /**
     * @param {String} path as serialized string
     */
    buildRoadsOnPath: function(roomName, serializedPath) {
        var room = Game.rooms[roomName];
        var path = Room.deserializePath(serializedPath);
        for (const position in path) {
            room.createConstructionSite(path[position].x, path[position].y, STRUCTURE_ROAD);
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

    saveRoomDamagedStructures: function(roomName) {
        var room = Game.rooms[roomName];
        var structures;
        structures = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits < structure.hitsMax);
            }
        });
        
        Memory[roomName].damagedStructures = Object.values(structures).map(x => x.id);
    },

    saveAllRoadConstructionSites: function() {
        var constructionSites = Game.constructionSites;
        var roads = Object.values(constructionSites).filter(
            site => site.structureType === STRUCTURE_ROAD
        );
        Memory.roadConstructionSites = Object.values(roads).map(site => site.id);
    },

    saveRoomRoadConstructionSites: function(roomName) {
        var room = Game.rooms[roomName];
        var roads = room.find(FIND_MY_CONSTRUCTION_SITES, {
            filter: (site) => {
                return (site.structureType === STRUCTURE_ROAD);
            }
        });
        Memory[roomName].roadContructionSites = Object.values(roads).map(site => site.id);
    },

    saveAllConstructionSites: function() {
        var constructionSites = Game.constructionSites;
        Memory.constructionSites = Object.keys(constructionSites);
    },

    saveRoomContructionSites: function(roomName) {
        var room = Game.rooms[roomName];
        var constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
        Memory[roomName].constructionSites = Object.values(constructionSites).map(site => site.id);
    },

    hasSpawn: function(roomName){ 
        var room = Game.rooms[roomName];
        return (room.find(FIND_MY_SPAWNS).length > 0);
    },

    hasStorage: function(roomName){
        var room = Game.rooms[roomName];
        return (room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_STORAGE);
            }
        }).length > 0)
    },
};
