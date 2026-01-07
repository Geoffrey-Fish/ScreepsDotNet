function roomsDefense(room) {


    let towers = _.get(room.memory, ['immobilia', 'towerlist']);


    if (towers.length) {
        _.forEach(towers, function (tower) {
            let toweR = Game.getObjectById(tower.id);
            let hostiles = toweR.room.find(FIND_HOSTILE_CREEPS);
            var closestDamagedStructure = toweR.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (struct) => {
                    return ((struct.hits < struct.hitsMax)&&struct.structureType !== STRUCTURE_WALL)
                }
             });
            if (hostiles.length) {
                room.memory['ALERT'] = true;
                let closestHostile = toweR.pos.findClosestByRange(hostiles);
                tower.attack(closestHostile);
            }
            else {
                room.memory['Alert'] = false;
            }

            if (!hostiles.length && closestDamagedStructure) {
                toweR.repair(closestDamagedStructure);
            }
        });
    }
}
module.exports = roomsDefense;
