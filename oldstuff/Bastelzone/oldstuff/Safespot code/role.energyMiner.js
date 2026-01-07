var roleEnergyMiner = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.mining == undefined) {
            console.log("EnergyMiner undefined!");
            creep.memory.mining = true;
        }
        if (creep.memory.mining && creep.store.getFreeCapacity() == 0) {
            creep.memory.mining = false;
            creep.say('🔄 Filling!');
        }

        if (!creep.memory.mining && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.mining = true;
            creep.say('🚧 mining');
        }

        if (creep.memory.mining) {
            creep.harvestEnergy();
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_LINK ||
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length) {
                var target = creep.pos.findClosestByRange(targets);
                if (creep.pos.isNearTo(target)) {
                    creep.transfer(target, RESOURCE_ENERGY);
                }
                else {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#3D66FF' } });
                }
            }
        }
    }
};
module.exports = roleEnergyMiner;
