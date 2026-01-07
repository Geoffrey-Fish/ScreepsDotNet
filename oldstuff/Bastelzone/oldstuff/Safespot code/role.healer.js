var roleHealer = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.role == 'healer') {
            creep.moveTo(30, 47, 'W46S41');
        }

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
