var roomControl = require("roomControl");
var roomCalculations = require("roomCalculations");

module.exports.loop = function () {

    //Clearing memory of dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // TODO: initializing of memory objects before calculations but running creeps after
    
    //run all rooms (important!)
    var myRooms = Game.rooms;
    for(var i in myRooms){
        roomControl.run(i);
        
    }

    // calculations for all rooms:
    roomCalculations.saveAllDamagedStructures();
    roomCalculations.saveAllAvailableRooms();
    roomCalculations.saveAllConstructionSites();

    //console logs:
    console.log('\n');
    console.log("CPU used: " + Math.floor(Game.cpu.getUsed() * 100)/100);

}