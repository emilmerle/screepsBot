var TestCreepFunctions = require("TestCreepFunctions");

module.exports.loop = function () {

    //Game.spawns["Spawn1"].spawnCreep([MOVE, CARRY, WORK], "TestCreep") to spawn

    //console logs:
    console.log('\n');
    console.log("CPU used: " + Math.floor(Game.cpu.getUsed() * 100)/100);

    var myRooms = Game.rooms;
    var allRooms = [];
    for (const i in myRooms) {
        allRooms.push(myRooms[i]);
    }

    var myCreeps;
    for (const room in allRooms) {
        myCreeps = allRooms[0].find(FIND_MY_CREEPS);
        for (const name in myCreeps) {
            TestCreepFunctions.run(myCreeps[name]);
        }   
    }
 
    //Clearing memory of dead creeps
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}