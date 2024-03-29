var roomControl = require("roomControl");
var roomCalculations = require("roomCalculations");
var sourceModule = require("sourceModule");

var constants = require("level");

module.exports.loop = function () {

    if (Game.cpu.bucket === 10000) {
        console.log("GENERATING PIXEL BECAUSE OF FULL BUCKET! WOHOO!")
        Game.cpu.generatePixel();
    }

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

    sourceModule.saveContainers();
    sourceModule.saveStorages();
    sourceModule.saveEnergySources();
    sourceModule.saveDroppedEnergy();
    sourceModule.saveWithdrawSources();
    sourceModule.saveAllMinerals();
    sourceModule.saveExtractors();

    //roomCalculations.calculateAllPathsToSources();
    //roomCalculations.buildMainPaths();
    //roomCalculations.saveRoomSpawns("sim");
    //roomCalculations.calculateRoomPathsToSources("sim");
    //roomCalculations.saveRoomContructionSites("sim");
    //roomCalculations.saveRoomRoadConstructionSites("sim");
    //roomCalculations.saveAllRoadConstructionSites();
    //roomCalculations.saveRoomEnergyAvailable("sim");

    //run all rooms (important!)
    var myRooms = Game.rooms;
    for(var i in myRooms){
        roomControl.run(i);
    }

    //console logs:
    console.log("CPU used: " + Math.floor(Game.cpu.getUsed() * 100)/100);
    console.log("Bucket: " + Game.cpu.bucket);
    console.log('\n');
}