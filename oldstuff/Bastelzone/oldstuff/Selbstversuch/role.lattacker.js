var roleLattacker = {  //longrange attack

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.role == 'lattacker') {
            creep.moveTo(14, 33, 'W41S45', { visualizePathStyle: { stroke: '#3903FF' } });
        }
        // if (creep.ticksToLive < 500) {
        //   creep.moveTo(14, 35, 'W41S45');
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
