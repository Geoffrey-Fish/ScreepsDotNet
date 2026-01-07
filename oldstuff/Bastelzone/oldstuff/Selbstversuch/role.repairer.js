var roleRepairer = {
    /** @param {Creep} creep **/

    run: function (creep) {

        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄Recharge');
        }

        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 Repairing');
        }
        if (creep.memory.repairing) {
            var tombs = creep.room.find(FIND_TOMBSTONES);
            var rotts = creep.room.find(FIND_STRUCTURES, {
                filter: (struct) => {
                    return ((struct.hits < struct.hitsMax) && struct.structureType !== STRUCTURE_WALL && struct.structureType !== STRUCTURE_RAMPART)
                }
            });
            rotts.sort((a, b) => a.hits - b.hits);
            if (tombs.length) {
                var tomb = creep.pos.findClosestByRange(tombs);
                if (creep.pos.isNearTo(tomb)) {
                    creep.withdraw(tomb, RESOURCE_ENERGY);
                }
                else {
                    creep.moveTo(tomb, { visualizePathStyle: { linestyle: 'dotted', stroke: '#00CC00' } });
                }
            }
            else if (rotts.length) {
                if (creep.pos.isNearTo(rotts[0])) {
                    creep.repair(rotts[0]);
                }
                else {
                    creep.moveTo(rotts[0], { visualizePathStyle: { linestyle: 'dotted', stroke: '#00CC00' } });
                }
            }
            else {
                let containerSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter:
                        (site) => site.structureType == STRUCTURE_CONTAINER
                });
                let closestContainer = creep.pos.findClosestByRange(containerSites);

                let sites = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter:
                        (site) => site.structureType != STRUCTURE_CONTAINER
                });
                let closestSite = creep.pos.findClosestByRange(sites);

                if (!containerSites) {
                    if (creep.pos.isNearTo(closestSite)) {
                        creep.build(closestSite);
                    }
                    else {
                        creep.moveTo(closestSite, { visualizePathStyle: { lineStyle: 'dotted', stroke: '#00CC00' } })
                    }
                }
                else {
                    if (creep.pos.isNearTo(closestContainer)) {
                        creep.build(closestContainer);
                    }
                    else {
                        creep.moveTo(closestContainer, { visualizePathStyle: { lineStyle: 'dotted', stroke: '#00CC00' } });
                    }
                }
            }

        }
        else {
           creep.findAccu();
        }
    }
};
module.exports = roleRepairer;
