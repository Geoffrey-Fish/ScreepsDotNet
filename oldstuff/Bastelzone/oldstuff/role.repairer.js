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
                filter: (struct) => {
                    return ((struct.hits < struct.hitsMax) && struct.structureType !== STRUCTURE_WALL)
                }
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
                var rott = creep.pos.findClosestByRange(rotts);
                if (creep.pos.isNearTo(rott)) {
                    creep.repair(rott);
                }
                else {
                    creep.moveTo(rott, { visualizePathStyle: { stroke: '#D3FF39' } });
                }
            }
        }
        else {
            creep.findAccu();
             var source = Game.getObjectById('5bbcaa8f9099fc012e631a1e')
            if (creep.pos.isNearTo(source)){
                creep.harvest(source);
            }
            else{
                creep.moveTo(source);
            }

        }
    }
};
module.exports = roleRepairer;
