module.exports = {

    // arguments could be:
    // controller (Object), controllerId (string), roomName (string)
    signMyController: function(creep, text){
        if (creep.room.controller.sign.text  != text) {
            if(creep.signController(creep.room.controller, text) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};