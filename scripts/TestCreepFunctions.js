var TestCreepFunctions = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let goals = _.map(creep.room.find(FIND_SOURCES), function(source) {
            // We can't actually walk on sources-- set `range` to 1 
            // so we path next to it.
            return { pos: source.pos, range: 1 };
        });
    
        let ret = PathFinder.search(creep.pos, goals);
        
        for (let index = 0; index < ret.path.length; index++) {
            creep.room.visual.text("o" , ret.path[index]);
        }

        //creep.room.visual.line(ret.path[0], ret.path[ret.path.length - 1]);

        //creep.move(creep.pos.getDirectionTo(pos));

        return 0;
	}
};

module.exports = TestCreepFunctions;