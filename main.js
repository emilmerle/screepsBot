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
var roomControl = require("roomControl");

module.exports.loop = function () {

    //console logs:
    console.log('\n');
    console.log(Game.cpu.getUsed());

    //run all rooms (important!)
    var myRooms = Game.rooms;
    for(var i in myRooms){
        roomControl.run(i);
    }
    
    //Clearing memory of dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}