var fighterModule = require("fighterModule");

var roleFighter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        fighterModule.ownAttackHostiles(creep);
	}
};

module.exports = roleFighter;