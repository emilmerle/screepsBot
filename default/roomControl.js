var roleStarter = require('role.starter');
var roleCarrier = require('role.carrier');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRoadbuilder = require("role.roadbuilder");
var roleRepairer = require("role.repairer");
var roleStaticHarvester = require("role.staticHarvester");
var roleExtractor = require("role.extractor");
var roleFighter = require("role.fighter");
var roleExplorer = require("role.explorer");
var roleClaimer = require("role.claimer");

var towerModule = require("towerModule");
var spawnControl = require("spawnControl");
var roomCalculations = require('roomCalculations'); 

//  constants for the bodyparts of the creeps
const BPEASIEST = [
    WORK,
    CARRY,
    MOVE, MOVE
];

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
    WORK, WORK,
    MOVE, MOVE
];

const BPCARRIER = [
    CARRY, CARRY, CARRY,
    MOVE, MOVE, MOVE
];

const BPFIGHTER = [
    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, 
    TOUGH, TOUGH, TOUGH, TOUGH, TOUGH
];

const BPEMERGENCY = [
    MOVE, MOVE,
    WORK, WORK,
    CARRY, CARRY
];

const BPCARRIEREMEGRENCY = [
    CARRY, CARRY, CARRY,
    MOVE, MOVE, MOVE
];

const BPCLAIMER = [
    CLAIM, 
    MOVE, MOVE
];



/**
 * This is the module for controlling a room
 * This involves the creeps and tower, as well as other structures
 */

var roomControl = {
    
    /** 
     * @param {Roomname} roomName 
     */
    run: function(roomName) {

    //  getting the object of the room to the given roomName
    var room = Game.rooms[roomName];

    //  array with all the creeps in the room
    //var myCreeps = room.find(FIND_MY_CREEPS);
    var myCreeps = Game.creeps;

    //  hasSpawn is true when theres a spawn in the room, false if not
    var hasSpawn = (room.find(FIND_MY_SPAWNS).length > 0);
    



    // constants for how many creeps per role there should be in a room
    const WANTEDSTARTER = 1;
    const WANTEDCARRIER = 3;
    const WANTEDSTATICHARVESTER = 3;
    const WANTEDUPGRADER = 0;
    const WANTEDBUILDER = 0;
    const WANTEDREPAIRER = 0;
    const WANTEDROADBUILDER = 0;
    const WANTEDEXTRACTOR = 0;
    const WANTEDFIGHTER = 0;
    const WANTEDEXPLORER = 0;
    const WANTEDCLAIMER = 0;



    //  filter creeps by role
    var starter = _.filter(myCreeps, (creep) => creep.memory.role === 'starter');
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



    //  MAIN LOOP (IMPORTANT!!!)

    //defines when and how many new creeps spawn
    //repairer have lowest priority
    //may be in its own module
    if(hasSpawn){

        // finds spawns that are available to spawn creeps
        var thisSpawn = room.find(FIND_MY_SPAWNS);
        var freeSpawn = thisSpawn[0];

        for(var j = 0; j < thisSpawn.length; j++){
            if(thisSpawn[j].spawning == null){
                freeSpawn = thisSpawn[j];
            }
        }
            


        // spawning new creeps if number alive is below wanted number 
        if(starter.length < WANTEDSTARTER){
            var newName = "starter" + 0;
            console.log("Trying to spawn Starter");
            if(Game.spawns[freeSpawn.name].spawnCreep(BPEASIEST, newName, {memory: {role: "starter"}}) === ERR_NAME_EXISTS){
                newName = "starter" + 1;
                Game.spawns[freeSpawn.name].spawnCreep(BPEASIEST, newName, {memory: {role: "starter"}});
            }
        }

        if(carrier.length < WANTEDCARRIER) {
            spawnControl.spawnRoleCreep(freeSpawn, "carrier", BPCARRIER);
        }

        if(staticHarvester.length < WANTEDSTATICHARVESTER){
            var newName = "StaticHarvester" + 0;
            console.log("Trying to spawn StaticHarvester");
            if(Game.spawns[freeSpawn.name].spawnCreep(BPHARVESTER, newName, {memory: {role: "staticHarvester"}}) === ERR_NAME_EXISTS){
                newName = "StaticHarvester" + 1;
                Game.spawns[freeSpawn.name].spawnCreep(BPHARVESTER, newName, {memory: {role: "staticHarvester"}});
            }
        }

        else if(upgrader.length < WANTEDUPGRADER) {
            var newName = 'Upgrader' + Game.time;
            console.log('Trying to spawn new Upgrader: ' + newName);
            Game.spawns[freeSpawn.name].spawnCreep(BPGENERAL, newName,
                {memory: {role: 'upgrader'}});
        }

        else if(builder.length < WANTEDBUILDER) {
            var newName = 'Builder' + Game.time;
            console.log('Trying to spawn new Builder: ' + newName);
            Game.spawns[freeSpawn.name].spawnCreep(BPEASIEST, newName,
                {memory: {role: 'builder'}});
        }

        else if(repairer.length < WANTEDREPAIRER) {
            var newName = 'Repairer' + Game.time;
            console.log('Trying to spawn new Repairer: ' + newName);
            Game.spawns[freeSpawn.name].spawnCreep(BPNORMAL, newName,
                {memory: {role: 'repairer'}});
        }

        else if(fighter.length < WANTEDFIGHTER) {
            var newName = 'Fighter' + Game.time;
            console.log('Trying to spawn new Fighter: ' + newName);
            Game.spawns[freeSpawn.name].spawnCreep(BPFIGHTER, newName,
                {memory: {role: 'fighter'}});
        }
        
        else if(explorer.length < WANTEDEXPLORER) {
            var newName = 'Explorer' + Game.time;
            console.log('Trying to spawn new Explorer: ' + newName);
            Game.spawns[freeSpawn.name].spawnCreep(BPEXPLORER, newName,
                {memory: {role: 'explorer'}});
        }

        else if(extractor.length < WANTEDEXTRACTOR) {
            var newName = 'Extractor' + Game.time;
            console.log('Trying to spawn new Extractor: ' + newName);
            Game.spawns[freeSpawn.name].spawnCreep(BPGENERAL, newName,
                {memory: {role: 'extractor'}});
        }

        else if(roadbuilder.length < WANTEDROADBUILDER) {
            var newName = 'Roadbuilder' + Game.time;
            console.log('Trying to spawn new Roadbuilder: ' + newName);
            Game.spawns[freeSpawn.name].spawnCreep(BPNORMAL, newName,
                {memory: {role: 'roadbuilder'}});
        }

        else if(claimer.length < WANTEDCLAIMER) {
            var newName = 'Claimer' + Game.time;
            console.log('Trying to spawn new Claimer: ' + newName);
            Game.spawns[freeSpawn.name].spawnCreep(BPCLAIMER, newName,
                {memory: {role: 'claimer'}});
        }



        //control towers
        towerModule.ownAttackHostiles();
        towerModule.ownHealAllies();


        //control creeps
        for(var name in myCreeps) {
            var creep = myCreeps[name];
            if(creep.memory.role === 'starter') {
                roleStarter.run(creep);
            }
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
    } else { // if room has no spawn

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


    // if(Game.time % 10 == 0){
    //     roomCalculations.pathSourcesSpawn(room);
    // }
    console.log(roomName + ": C:"+ carrier.length+ " SH:"+ staticHarvester.length+ " U:"+ upgrader.length+ " B:"+ builder.length+ " R:"+repairer.length+ " F:"+fighter.length);
    //console.log("\n");
    
    /*
    console.log('Carrier: ' + carrier.length + "/3");
    console.log("StaticHarvester: " + staticHarvester.length + "/2");
    console.log('Upgrader: ' + upgrader.length + "/3");
    console.log('Builder: ' + builder.length + "/3");
    console.log('Repairer: ' + repairer.length + "/1");
    console.log("Fighter:" + fighter.length + "/1");
    console.log("Claimer: " + claimer.length + "/1");
    console.log('Roadbuilder: ' + roadbuilder.length + "/0");
    console.log("Extractor: " + extractor.length + "/0");
    console.log("Explorer: "+ explorer.length + "/0");
    */
    
    }
};

module.exports = roomControl;