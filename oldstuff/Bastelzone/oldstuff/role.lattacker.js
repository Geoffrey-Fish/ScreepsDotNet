var roleLattacker = {  //longrange attack

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.role == 'lattacker') {
            creep.moveTo(21, 35, 'W46S41', { visualizePathStyle: { stroke: '#3903FF' } });
        }
        // if (creep.ticksToLive < 500) {
        //   creep.moveTo(24, 35, 'W46S41');
        // }
        var enemy = creep.room.find(FIND_HOSTILE_CREEPS);
        if (enemy.length) {
            var enem = creep.pos.findClosestByRange(enemy);
            if (creep.pos.inRangeTo(enem, 3)) {
                creep.rangedAttack(enemy);
            }
            else {
                creep.moveTo(enem, { visualizePathStyle: { stroke: '#3903FF' } });
            }
        }
    }
};

module.exports = roleLattacker;
