var roleCarrier = require('role.carrier');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRoadbuilder = require("role.roadbuilder");
var roleRepairer = require("role.repairer");
var roleStaticHarvester = require("role.staticHarvester");
var towerModule = require("towerModule");

module.exports.loop = function () {

    console.log('\n');

    const BPGENERAL = [
        WORK, WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    ];

    const BPHARVESTER = [
        WORK, WORK, WORK, WORK, WORK, 
        MOVE, MOVE
    ];

    const BPCARRIER = [
        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
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

    var staticHarvester = _.filter(Game.creeps, (creep) => creep.memory.role === "staticHarvester")


    //variable for how many creeps there will be in total (not accurate)
    var totalCreeps = repairer.length + roadbuilder.length + builder.length + upgrader.length + carrier.length;
    totalCreeps = (totalCreeps >= 10) ? 10 : totalCreeps;

    //variable for how many creeps of a role there will be (not accurate and will be multiplied)
    var flooredRoleCreeps = Math.floor(totalCreeps/4);
    var totalRoleCreeps = ((flooredRoleCreeps == 0) ? 1 : flooredRoleCreeps);

    //defines when and how many new creeps spawn
    //should be in its own module
    if(repairer.length < totalRoleCreeps) {
        var newName = 'Repairer' + Game.time;
        console.log('Trying to spawn new Repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
            {memory: {role: 'repairer'}});
    }

    if(roadbuilder.length < totalRoleCreeps) {
        var newName = 'Roadbuilder' + Game.time;
        console.log('Trying to spawn new Roadbuilder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
            {memory: {role: 'roadbuilder'}});
    }

    if(builder.length < totalRoleCreeps*2) {
        var newName = 'Builder' + Game.time;
        console.log('Trying to spawn new Builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(BPGENERAL, newName,
            {memory: {role: 'builder'}});
}

    if(upgrader.length < totalRoleCreeps*2) {
        var newName = 'Upgrader' + Game.time;
        console.log('Trying to spawn new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(BPGENERAL, newName,
            {memory: {role: 'upgrader'}});
    }

    if(carrier.length < totalRoleCreeps*2) {
        var newName = 'Carrier' + Game.time;
        console.log('Trying to spawn new Carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(BPCARRIER, newName,
            {memory: {role: 'carrier'}});
    }

    if(staticHarvester.length < 2){
        var newName = "StaticHarvester" + 0;
        console.log("Trying to spawn StaticHarvester");
        if(Game.spawns["Spawn1"].spawnCreep(BPHARVESTER, newName, {memory: {role: "staticHarvester"}}) === ERR_NAME_EXISTS){
            newName = "StaticHarvester" + 1;
            Game.spawns["Spawn1"].spawnCreep(BPHARVESTER, newName, {memory: {role: "staticHarvester"}});
        }
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

    //Every tick:

    //console logs:
    
    //console.log("totalCreeps: " + totalCreeps);
    //console.log("totalRoleCreeps: " + totalRoleCreeps)


    console.log('Carrier: ' + carrier.length + "/" + totalRoleCreeps*2);
    console.log('Upgrader: ' + upgrader.length + "/" + totalRoleCreeps*2);
    console.log('Builder: ' + builder.length + "/" + totalRoleCreeps*2);
    console.log('Roadbuilder: ' + roadbuilder.length + "/" + totalRoleCreeps);
    console.log('Repairer: ' + repairer.length + "/" + totalRoleCreeps);
    console.log("StaticHarvester: " + staticHarvester.length + "/2");
    
    //main game loop
    //towers
    towerModule.ownAttackHostiles();

    //creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'repairer') {
            roleRepairer.run(creep);
        }
        //remove harvester later
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
    }
}