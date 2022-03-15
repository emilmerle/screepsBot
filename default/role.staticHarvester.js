var harvestModule = require("harvestModule");
const BPHARVESTERSCALE = [
    WORK,
    MOVE
];
const BPCOST = 150;

var roleStaticHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        harvestModule.harvestEnergySources(creep);
	},

    spawn: function(spawnName) {
        var spawn = Game.spawns[spawnName];
        var room = spawn.room;
        var partNumber = Math.floor(room.energyCapacityAvailable / BPCOST);
        var parts = [];
        for (let index = 0; index < partNumber; index++) {
            parts = parts.concat(BPHARVESTERSCALE);
        }

        var newName = "Harvester" + Game.time;
            console.log("Trying to spawn Harvester", newName);
            spawn.spawnCreep(parts, newName,
                {memory: {role: "Harvester", source: 0}});

    }
};

module.exports = roleStaticHarvester;