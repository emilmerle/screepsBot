module.exports = {

    attackAllHostiles: function(creep){
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
            if(creep.attack(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    },


    healAllAllies: function(creep){
        const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if(target) {
            if(creep.heal(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    },


    attackHostile: function(creep, hostile) {
        if(creep.attack(hostile) === ERR_NOT_IN_RANGE) {
            creep.moveTo(hostile);
        }
    },


    healAlly: function(creep, ally) {
        if(creep.heal(ally) === ERR_NOT_IN_RANGE) {
            creep.moveTo(ally);
        }
    }
};