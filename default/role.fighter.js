var roleFighter = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var fighterModule = require("fighterModule");

        var attackFinished = fighterModule.ownAttackHostiles(creep);
        if(attackFinished != 1){
            creep.moveTo(Game.flags.FighterCollection);
        }
	}
};

module.exports = roleFighter;