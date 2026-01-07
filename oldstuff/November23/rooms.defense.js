function defense(room) {
    if(!room.memory.alarm){
        room.memory.alarm = false;
    };

    var towers = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER);
        }
    });

    if (towers.length) {
        _.forEach(towers, function (tower) {
            var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
            if (hostiles.length) {
                room.memory.alarm = true;
                let closestHostile = tower.pos.findClosestByRange(hostiles);
                tower.attack(closestHostile);
            }
            else if (!hostiles) {
                room.memory.alarm = false;
            }
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (struct) => {
                    return ((struct.hits < struct.hitsMax)&&struct.structureType !== STRUCTURE_WALL)
                }
            });
            if (!hostiles.length && closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
        });
    };
};
module.exports = defense;
