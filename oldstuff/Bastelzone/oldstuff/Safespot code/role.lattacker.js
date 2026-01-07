var roleLattacker = {  //longrange attack

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.role == 'lattacker') {
            creep.moveTo(29, 46, 'W46S41', { visualizePathStyle: { stroke: '#3903FF' } });
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

module.exports = roleLattacker;
