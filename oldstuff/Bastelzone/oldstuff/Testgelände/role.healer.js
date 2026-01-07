var roleHealer = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.role == 'healer') {
            creep.moveTo(14, 33, 'W41S45');
        }
        // if (creep.ticksToLive < 500) {
        //     creep.moveTo(14, 35, 'W41S45');
        // }

        var victims = creep.room.find(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.hits < object.hitsMax;
            }
        });

        if (victims.length) {
            var victim = creep.pos.findclosestByRange(victims);
            if (creep.pos.isNearTo(victim)) {
                creep.heal(victim);
            }
            else {
                creep.moveTo(victim, { visualizePathStyle: { stroke: '#6539FF' } });
            }
        }
    }
};

module.exports = roleHealer;
