function roomsDefense(room) {

    var towers = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER);
        }
    });

    if (towers) {
        _.forEach(towers, function (tower) {

            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (struct) => {
                    return (struct.hits < struct.hitsMax)
                }
            });
            console.log(closestDamagedStructure, 'look tower')
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            let hostiles = tower.room.find(FIND_HOSTILE_CREEPS);



            if (hostiles.length) {
                let closestHostile = tower.pos.findClosestByRange(hostiles);
                console.log(hostiles, 'EINDRINGLINGE')
                tower.say('GOTTA KILLEM ALL')
                tower.attack(hostile);
            }

        });
    }
}
module.exports = roomsDefense;
