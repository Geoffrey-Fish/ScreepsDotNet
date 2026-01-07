var roleSattacker = { //shortrange attack

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.role == 'sattacker') {
            creep.moveTo(22, 34, 'W46S41');
        }
        // if (creep.ticksToLive < 500) {
        //     creep.moveTo(23, 34, 'W46S41');
        // }
        var enemy = creep.room.find(FIND_HOSTILE_CREEPS);
        if (enemy.length) {
            var closest = creep.pos.findClosestByRange(enemy);
            if (creep.pos.isNearTo(closest)) {
                creep.attack(closest);
            }
            else {
                creep.moveTo(closest, { visualizePathStyle: { stroke: '#3903FF' } });
            }
        }
    }
};

module.exports = roleSattacker;
