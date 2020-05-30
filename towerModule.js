//TODO: Write tower behaviour
module.exports = {
    ownAttackHostiles: function() {
        var rooms = Game.rooms;
        for(var i in rooms){
            var roomName = rooms[i].name;
            var tower = Game.rooms[roomName].find(FIND_MY_STRUCTURES,  {filter: {structureType: STRUCTURE_TOWER}});
            var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
            for(var towers in tower) {
                tower[towers].attack(hostiles[0]);
                //console.log(tower[towers].pos);
            }
        }

        
    }
};