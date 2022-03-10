module.exports = {

    findAllConstructionSites: function() {
        var constructionSites = Game.constructionSites;
        // TODO: filter only ids of sites
        var ids = constructionSites.filter(
            site => { return site}
        )
        // only ids would be better
        Memory.constructionSites = constructionSites;
    },

    hasSpawn: function(room){ 
        return (room.find(FIND_MY_SPAWNS).length > 0);
    },

    hasStorage: function(room){
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

        let goals = _.map(room.find(FIND_SOURCES), function(source) {
            // We can't actually walk on sources-- set `range` to 1 
            // so we path next to it.
            return { pos: source.pos, range: 1 };
        });

        //var ret = PathFinder.search(spawn, goals);
        //console.log(ret);
        //Memory[room.name].testPath = ret;
    },
};
