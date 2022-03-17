var constants = require("level");

module.exports = {

    /**
     * Initializes the memory for a room so other function can access the memory object.
     */
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

    /** 
     * Saves how much energy is available to spawn new creeps.
     */
    saveRoomEnergyAvailable: function(roomName) {
        var room = Game.rooms[roomName];
        Memory[roomName].energy.capacity = room.energyCapacityAvailable;
        Memory[roomName].energy.available = room.energyAvailable;
    },

    /** 
     * Saves all structures in a room that have a partially filled energy store.
     */ 
    saveRoomFreeEnergyStructures: function(roomName) {
        var room = Game.rooms[roomName];
        var targets = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.store)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        Memory[roomName].freeEnergyStructures = targets.map(structure => structure.id);
    },

    /** 
     * Saves all structures in a room that have a full energy store.
     */ 
    saveRoomFullEnergyStructures: function(roomName) {
        var room = Game.rooms[roomName];
        var targets = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.store)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
            }
        });
        Memory[roomName].fullEnergyStructures = targets.map(structure => structure.id);
    },

    /**
     * Saves all own spawns in the global Memory.allSpawns object and
     * in all Memory[roomName].allSpaws object.
     * still updates memory of rooms.
     */
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

    /**
     * Saves all spawns in that room in the Memory[roomName].allSpawns object.
     * @param {String} roomName 
     */
    saveRoomSpawns: function(roomName) {
        var room = Game.rooms[roomName];
        var spawns = room.find(FIND_MY_SPAWNS);
        Memory[roomName].allSpawns = Object.values(spawns).map(spawn => spawn.id);
    },

    /**
     * Should maybe only called once. 
     * Calculates all pathes from all spawns to all sources 
     * and from controller to all sources in a room
     * and saves them serialized in the Memory[roomName].mainPaths object.
     */
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

    /**
     * Calculates all pathes from all spawns to all sources 
     * and from controller to all sources in the room
     * and saves them serialized in the Memory[roomName].mainPaths object.
     * Should be called after spawns and sources are written into memory.
     * @param {String} roomName 
     */
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

    /**
     * Places road construction sites on the paths in the
     * Memory[roomName].mainPaths object.
     * Should maybe be only called once.
     */
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

    /**
     * Places road construction sites on the paths in the
     * Memory[roomName].mainPaths object.
     * Should only be called after main pathes are calculated.
     * @param {String} roomName 
     */
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
     * Places road construction sites on the given serialized path in the room.
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

    /**
     * Saves all available rooms in the global Memory.rooms object.
     */
    saveAllAvailableRooms: function() {
        var rooms = Game.rooms;
        Memory.rooms = Object.keys(rooms);
    },

    /**
     * Saves all damaged structures in all rooms
     * in the Memory[roomName].damagedStrucutes object.
     */
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

    /**
     * Saves all damaged structures in the room
     * in the Memory[roomName].damagedStrucutes object.
     * @param {String} roomName
     */
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

    /**
     * Saves all road construction sites of all rooms
     * in the global Memory.roadConstructionSites object.
     */
    saveAllRoadConstructionSites: function() {
        var constructionSites = Game.constructionSites;
        var roads = Object.values(constructionSites).filter(
            site => site.structureType === STRUCTURE_ROAD
        );
        Memory.roadConstructionSites = Object.values(roads).map(site => site.id);
    },

    /**
     * Saves all road construction sites in the room
     * in the Memory[roomName].roadContructionSites object.
     * @param {String} roomName 
     */
    saveRoomRoadConstructionSites: function(roomName) {
        var room = Game.rooms[roomName];
        var roads = room.find(FIND_MY_CONSTRUCTION_SITES, {
            filter: (site) => {
                return (site.structureType === STRUCTURE_ROAD);
            }
        });
        Memory[roomName].roadContructionSites = Object.values(roads).map(site => site.id);
    },

    /**
     * Saves all construction sites of all rooms
     * in the global Memory.constructionSites object.
     */
    saveAllConstructionSites: function() {
        var constructionSites = Game.constructionSites;
        Memory.constructionSites = Object.keys(constructionSites);
    },

    /**
     * Saves all construction sites in the room
     * in the Memory[roomName].constructionSites object.
     * @param {String} roomName 
     */
    saveRoomContructionSites: function(roomName) {
        var room = Game.rooms[roomName];
        var constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
        Memory[roomName].constructionSites = Object.values(constructionSites).map(site => site.id);
    },

    /**
     * Returns whether the given room has a spawn or not.
     * @param {String} roomName 
     * @returns {Boolean} True if the room has a spawn, false if not
     */
    hasSpawn: function(roomName){ 
        var room = Game.rooms[roomName];
        return (room.find(FIND_MY_SPAWNS).length > 0);
    },

    /**
     * Returns whether the given room has a spawn or not.
     * @param {String} roomName 
     * @returns {Boolean} True if the room has a storage, false if not
     */
    hasStorage: function(roomName){
        var room = Game.rooms[roomName];
        return (room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_STORAGE);
            }
        }).length > 0)
    },
};
