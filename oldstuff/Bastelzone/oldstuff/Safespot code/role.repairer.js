var roleRepairer = {
    /** @param {Creep} creep **/

    run: function (creep) {

        if (creep.memory.repairing == undefined) {
            console.log("Repairer undefined!");
            creep.memory.repairing = true;
        }
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄');
        }

        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧');
        }
        if (creep.memory.repairing) {
            var tombs = creep.room.find(FIND_TOMBSTONES);
            var rotts = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            rotts.sort((a, b) => a.hits - b.hits);
            if (tombs.length) {
                var tomb = creep.pos.findClosestByRange(tombs);
                if (creep.pos.isNearTo(tomb)) {
                    creep.withdraw(tomb, RESOURCE_ENERGY);
                }
                else {
                    creep.moveTo(tomb, { visualizePathStyle: { stroke: '#FF6539' } });
                }
            }
            if (!tombs.length && rotts.length) {
                if (creep.pos.isNearTo(rotts[0])) {
                    creep.repair(rotts[0]);
                }
                else {
                    creep.moveTo(rotts[0], { visualizePathStyle: { stroke: '#D3FF39' } });
                }
            }
        }
        else {
            creep.findAccu();
        }
    }
};
module.exports = roleRepairer;
