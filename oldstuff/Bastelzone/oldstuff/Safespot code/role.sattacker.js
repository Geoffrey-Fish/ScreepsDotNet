var roleSattacker = { //shortrange attack

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.role == 'sattacker') {
            /* creep.moveTo(30, 46, 'W46S41', { visualizePathStyle: { stroke: '#FF27FC' } });*/
            creep.moveTo(27, 45, 'W46S41');
        }
        let enemy = creep.room.find(FIND_HOSTILE_CREEPS);
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
