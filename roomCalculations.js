module.exports = {

    checkForSpawn: function(room){ 
        return (room.find(FIND_MY_SPAWNS).length > 0);
    },

    checkForStorage: function(room){
        return (room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_STORAGE);
            }
        }).length > 0)
    },

    pathSourcesSpawn(room){
        var spawn = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN);
            }
        });

        var sources = room.find(FIND_SOURCES);
        var start = sources[0];
        var goals = [];
        goals[0] = spawn;
        sources.shift();
        while(sources.length > 0){
            console.log("more than one: " + sources[0]);
            goals.push(sources[0]);
            sources.shift();
            //console.log(goals[0]);
            //console.log(goals[1]);
        }
        console.log("Start: "+ start);
        for(var i in goals){
            //console.log(goals.length);
            console.log(goals[i]);
        }
        var ret = PathFinder.search(start, goals);
        console.log(ret);
    },
};
