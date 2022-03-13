var roomControl = require("roomControl");
var roomCalculations = require("roomCalculations");
var roomSources = require("roomSources");

var constants = require("level");

module.exports.loop = function () {

    //Clearing memory of dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // calculations for all rooms:
    roomCalculations.initializeMemory();
    roomCalculations.saveAllDamagedStructures();
    roomCalculations.saveAllAvailableRooms();
    roomCalculations.saveAllConstructionSites();
    roomCalculations.saveAllSpawns();

    roomSources.saveContainers();
    roomSources.saveStorages();
    roomSources.saveEnergySources();
    roomSources.saveDroppedEnergy();
    roomSources.saveWithdrawSources();

    roomCalculations.calculatePathsToSources();

    //run all rooms (important!)
    var myRooms = Game.rooms;
    for(var i in myRooms){
        roomControl.run(i);
    }

    //console logs:
    console.log('\n');
    console.log("CPU used: " + Math.floor(Game.cpu.getUsed() * 100)/100);

}