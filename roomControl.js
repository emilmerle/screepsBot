/**
 * This is the module for controlling a room
 * This involves the creeps and tower, as well as other structures
 */

var roomControl = {
    
    /** @param {Roomname} roomName **/
    run: function(roomName) {

//
//  constants for the bodyparts of the creeps
        const BPNORMAL = [
            WORK, WORK,
            CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE
        ];
    
        const BPGENERAL = [
            WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
        ];
    
        const BPHARVESTER = [
            WORK, WORK, WORK, WORK, WORK, 
            MOVE, MOVE, MOVE
        ];
    
        const BPCARRIER = [
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
        ];
    
        const BPFIGHTER = [
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, 
            TOUGH, TOUGH, TOUGH, TOUGH, TOUGH
        ];
    
        BPEMERGENCY = [
            MOVE, MOVE,
            WORK, WORK,
            CARRY, CARRY
        ];
    
        BPCARRIEREMEGRENCY = [
            CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE
        ];

        BPCLAIMER = [
            CLAIM, 
            MOVE, MOVE
        ];


//
//  own modules
        var roleCarrier = require('role.carrier');
        var roleUpgrader = require('role.upgrader');
        var roleBuilder = require('role.builder');
        var roleRoadbuilder = require("role.roadbuilder");
        var roleRepairer = require("role.repairer");
        var roleStaticHarvester = require("role.staticHarvester");
        var roleExtractor = require("role.extractor");
        var roleFighter = require("role.fighter");
        var towerModule = require("towerModule");
        var roleExplorer = require("role.explorer");
        var roleClaimer = require("role.claimer");

//
//  getting the object of the room to the given roomName
        var room = Game.rooms[roomName];
//
//  array with all the creeps in the room
        var myCreeps = room.find(FIND_MY_CREEPS);
//
//  hasSpawn is true when theres a spawn in the room, false if not
        var hasSpawn = (room.find(FIND_MY_SPAWNS).length > 0) ? true : false;

//
//  filter creeps by role
        var carrier = _.filter(myCreeps, (creep) => creep.memory.role === 'carrier');
        var staticHarvester = _.filter(myCreeps, (creep) => creep.memory.role === "staticHarvester");
        var upgrader = _.filter(myCreeps, (creep) => creep.memory.role === 'upgrader');
        var builder = _.filter(myCreeps, (creep) => creep.memory.role === 'builder');
        var repairer = _.filter(myCreeps, (creep) => creep.memory.role === 'repairer');
        var fighter = _.filter(myCreeps, (creep) => creep.memory.role === "fighter");
        var roadbuilder = _.filter(myCreeps, (creep) => creep.memory.role === 'roadbuilder');
        var extractor = _.filter(myCreeps, (creep) => creep.memory.role === "extractor");
        var explorer = _.filter(myCreeps, (creep) => creep.memory.role === "explorer");
        var claimer = _.filter(myCreeps, (creep) => creep.memory.role === "claimer");


//
//  MAIN LOOP (IMPORTANT!!!)
//


        
        thisSpawn = room.find(FIND_MY_SPAWNS)[0];
        
        //defines when and how many new creeps spawn
        //repairer have lowest priority
        //may be in its own module
        if(hasSpawn){
            if(carrier.length < 3) {
                var newName = 'Carrier' + Game.time;
                console.log('Trying to spawn new Carrier: ' + newName);
                Game.spawns[thisSpawn.name].spawnCreep(BPCARRIER, newName,
                    {memory: {role: 'carrier'}});
            }

            else if(staticHarvester.length < 2){
                var newName = "StaticHarvester" + 0;
                console.log("Trying to spawn StaticHarvester");
                if(Game.spawns[thisSpawn.name].spawnCreep(BPHARVESTER, newName, {memory: {role: "staticHarvester"}}) === ERR_NAME_EXISTS){
                    newName = "StaticHarvester" + 1;
                    Game.spawns[thisSpawn.name].spawnCreep(BPHARVESTER, newName, {memory: {role: "staticHarvester"}});
                }
            }

            else if(upgrader.length < 3) {
                var newName = 'Upgrader' + Game.time;
                console.log('Trying to spawn new Upgrader: ' + newName);
                Game.spawns[thisSpawn.name].spawnCreep(BPGENERAL, newName,
                    {memory: {role: 'upgrader'}});
            }

            else if(builder.length < 3) {
                var newName = 'Builder' + Game.time;
                console.log('Trying to spawn new Builder: ' + newName);
                Game.spawns[thisSpawn.name].spawnCreep(BPGENERAL, newName,
                    {memory: {role: 'builder'}});
            }

            else if(repairer.length < 1) {
                var newName = 'Repairer' + Game.time;
                console.log('Trying to spawn new Repairer: ' + newName);
                Game.spawns[thisSpawn.name].spawnCreep(BPNORMAL, newName,
                    {memory: {role: 'repairer'}});
            }

            else if(fighter.length < 1) {
                var newName = 'Fighter' + Game.time;
                console.log('Trying to spawn new Fighter: ' + newName);
                Game.spawns[thisSpawn.name].spawnCreep(BPFIGHTER, newName,
                    {memory: {role: 'fighter'}});
            }
            
            else if(explorer.length < 0) {
                var newName = 'Explorer' + Game.time;
                console.log('Trying to spawn new Explorer: ' + newName);
                Game.spawns[thisSpawn.name].spawnCreep(BPEXPLORER, newName,
                    {memory: {role: 'explorer'}});
            }

            else if(extractor.length < 0) {
                var newName = 'Extractor' + Game.time;
                console.log('Trying to spawn new Extractor: ' + newName);
                Game.spawns[thisSpawn.name].spawnCreep(BPGENERAL, newName,
                    {memory: {role: 'extractor'}});
            }

            else if(roadbuilder.length < 0) {
                var newName = 'Roadbuilder' + Game.time;
                console.log('Trying to spawn new Roadbuilder: ' + newName);
                Game.spawns[thisSpawn.name].spawnCreep(BPNORMAL, newName,
                    {memory: {role: 'roadbuilder'}});
            }

            else if(claimer.length < 0) {
                var newName = 'Claimer' + Game.time;
                console.log('Trying to spawn new Claimer: ' + newName);
                Game.spawns[thisSpawn.name].spawnCreep(BPCLAIMER, newName,
                    {memory: {role: 'claimer'}});
            }


            //control towers
            towerModule.ownAttackHostiles();
            towerModule.ownHealAllies();


            //control creeps
            for(var name in myCreeps) {
                var creep = myCreeps[name];
                if(creep.memory.role === 'repairer') {
                    roleRepairer.run(creep);
                }
                if(creep.memory.role === "carrier") {
                    roleCarrier.run(creep);
                }
                if(creep.memory.role === 'upgrader') {
                    roleUpgrader.run(creep);
                }
                if (creep.memory.role === "builder") {
                    roleBuilder.run(creep);
                }
                if(creep.memory.role === 'roadbuilder') {
                    roleRoadbuilder.run(creep);
                }
                if(creep.memory.role === "staticHarvester"){
                    roleStaticHarvester.run(creep);
                }
                if(creep.memory.role === "extractor"){
                    roleExtractor.run(creep);
                }
                if(creep.memory.role === "fighter"){
                    roleFighter.run(creep);
                }
                if(creep.memory.role === "explorer"){
                    roleExplorer.run(creep);
                }
                if(creep.memory.role === "claimer") {
                    roleClaimer.run(creep);
                }
            }
        } else {
            //control creeps
            for(var name in myCreeps) {
                var creep = myCreeps[name];
                if(creep.memory.role === 'repairer') {
                    roleRepairer.run(creep);
                }
                if(creep.memory.role === "carrier") {
                    roleCarrier.run(creep);
                }
                if(creep.memory.role === 'upgrader') {
                    roleUpgrader.run(creep);
                }
                if (creep.memory.role === "builder") {
                    roleBuilder.run(creep);
                }
                if(creep.memory.role === 'roadbuilder') {
                    roleRoadbuilder.run(creep);
                }
                if(creep.memory.role === "staticHarvester"){
                    roleStaticHarvester.run(creep);
                }
                if(creep.memory.role === "extractor"){
                    roleExtractor.run(creep);
                }
                if(creep.memory.role === "fighter"){
                    roleFighter.run(creep);
                }
                if(creep.memory.role === "explorer"){
                    roleExplorer.run(creep);
                }
                if(creep.memory.role === "claimer") {
                    roleClaimer.run(creep);
                }
            }
        }
        /*
        console.log('Carrier: ' + carrier.length + "/3");
        console.log("StaticHarvester: " + staticHarvester.length + "/2");
        console.log('Upgrader: ' + upgrader.length + "/3");
        console.log('Builder: ' + builder.length + "/3");
        console.log('Repairer: ' + repairer.length + "/1");
        console.log("Fighter:" + fighter.length + "/1");
        console.log("Claimer: " + claimer.length + "/1");
        */
        //console.log('Roadbuilder: ' + roadbuilder.length + "/0");
        //console.log("Extractor: " + extractor.length + "/0");
        //console.log("Explorer: "+ explorer.length + "/0");
    }
};

module.exports = roomControl;