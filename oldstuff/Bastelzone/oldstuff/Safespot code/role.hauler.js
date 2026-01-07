let roleHauler = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.hauling == undefined) {
            console.log("Hauler undefined!");
            creep.memory.hauling = true;
        }
        if (creep.memory.hauling && creep.store.getFreeCapacity() == 0) {
            creep.memory.hauling = false;
            creep.say('🔄 ');
        }
        if (!creep.memory.hauling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.hauling = true;
            creep.say('🚧 ');
        };
        if (creep.memory.hauling) {
            let droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            });
            if (droppedEnergy.length) {
                let closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy);
                if (creep.pos.isNearTo(closestDroppedEnergy)) {
                    creep.pickup(closestDroppedEnergy);
                } else {
                    creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#3DFFD6' } });
                }
            }
        }
        else {
            let extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION && (
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) <= structure.store.getCapacity / 2 ||
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    )
                }
            });
            let refill = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_LINK ||
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_CONTAINER) && (
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) <= structure.store.getCapacity / 2 ||
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        ))
                }
            });
            if (extensions.length) {

                let closeEx = creep.pos.findClosestByRange(extensions);
                if (creep.pos.isNearTo(closeEx)) {
                    creep.transfer(closeEx, RESOURCE_ENERGY);
                }
                else {
                    creep.moveTo(closeEx, { visualizePathStyle: { stroke: '#3D66FF' } });
                }
            }
            if (!extensions.length && refill.length) {
                let closestRefill = creep.pos.findClosestByRange(refill);
                if (creep.pos.isNearTo(closestRefill)) {
                    creep.transfer(closestRefill, RESOURCE_ENERGY);
                }
                else {
                    creep.moveTo(closestRefill, { visualizePathStyle: { stroke: '#3D66FF' } });
                }
            }
        }
    }
};

module.exports = roleHauler;
