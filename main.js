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

module.exports.loop = function () {

    console.log('\n');

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
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //filter roles of creeps
    var repairer = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');

    var roadbuilder = _.filter(Game.creeps, (creep) => creep.memory.role === 'roadbuilder');

    var builder = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');

    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');

    var carrier = _.filter(Game.creeps, (creep) => creep.memory.role === 'carrier');

    var staticHarvester = _.filter(Game.creeps, (creep) => creep.memory.role === "staticHarvester");

    var extractor = _.filter(Game.creeps, (creep) => creep.memory.role === "extractor");

    var fighter = _.filter(Game.creeps, (creep) => creep.memory.role === "fighter");

    var explorer = _.filter(Game.creeps, (creep) => creep.memory.role === "explorer");


    //variable for how many creeps there will be in total (not accurate)
    var totalCreeps = repairer.length + roadbuilder.length + builder.length + upgrader.length + carrier.length;


    //defines when and how many new creeps spawn
    //repairer have lowest priority
    //may be in its own module
    if(carrier.length < 3) {
        var newName = 'Carrier' + Game.time;
        console.log('Trying to spawn new Carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(BPCARRIER, newName,
            {memory: {role: 'carrier'}});
    }

    else if(staticHarvester.length < 2){
        var newName = "StaticHarvester" + 0;
        console.log("Trying to spawn StaticHarvester");
        if(Game.spawns["Spawn1"].spawnCreep(BPHARVESTER, newName, {memory: {role: "staticHarvester"}}) === ERR_NAME_EXISTS){
            newName = "StaticHarvester" + 1;
            Game.spawns["Spawn1"].spawnCreep(BPHARVESTER, newName, {memory: {role: "staticHarvester"}});
        }
    }

    else if(upgrader.length < 2) {
        var newName = 'Upgrader' + Game.time;
        console.log('Trying to spawn new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(BPGENERAL, newName,
            {memory: {role: 'upgrader'}});
    }

    else if(builder.length < 2) {
        var newName = 'Builder' + Game.time;
        console.log('Trying to spawn new Builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(BPGENERAL, newName,
            {memory: {role: 'builder'}});
    }

    else if(repairer.length < 1) {
        var newName = 'Repairer' + Game.time;
        console.log('Trying to spawn new Repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(BPNORMAL, newName,
            {memory: {role: 'repairer'}});
    }

    else if(fighter.length < 1) {
        var newName = 'Fighter' + Game.time;
        console.log('Trying to spawn new Fighter: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(BPFIGHTER, newName,
            {memory: {role: 'fighter'}});
    }
    
    else if(explorer.length < 0) {
        var newName = 'Explorer' + Game.time;
        console.log('Trying to spawn new Explorer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(BPEXPLORER, newName,
            {memory: {role: 'explorer'}});
    }

    else if(extractor.length < 0) {
        var newName = 'Extractor' + Game.time;
        console.log('Trying to spawn new Extractor: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(BPGENERAL, newName,
            {memory: {role: 'extractor'}});
    }

    else if(roadbuilder.length < 0) {
        var newName = 'Roadbuilder' + Game.time;
        console.log('Trying to spawn new Roadbuilder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(BPNORMAL, newName,
            {memory: {role: 'roadbuilder'}});
    }

    //console log if a new creep spawns
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    //console logs:
    
    //console.log("totalCreeps: " + totalCreeps);
    //console.log("totalRoleCreeps: " + totalRoleCreeps)
    
    //console.log(Game.map.findExit("W3S8", "W2S8"));
    //console.log(Game.cpu.getUsed());

    console.log('Carrier: ' + carrier.length + "/" + 3);
    console.log("StaticHarvester: " + staticHarvester.length + "/2");
    console.log('Upgrader: ' + upgrader.length + "/2");
    console.log('Builder: ' + builder.length + "/2");
    console.log('Repairer: ' + repairer.length + "/1");
    console.log("Fighter:" + fighter.length + "/1");
    //console.log('Roadbuilder: ' + roadbuilder.length + "/0");
    //console.log("Extractor: " + extractor.length + "/0");
    //console.log("Explorer: "+ explorer.length + "/0");
    
    

    //towers
    towerModule.ownAttackHostiles();
    towerModule.ownHealAllies();

    //creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
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
    }
}