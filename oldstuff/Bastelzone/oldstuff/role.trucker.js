var roleTrucker = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.harvest == undefined) {
            console.log("Trucker undefined!");
            creep.memory.harvest = true;
        }
        if (creep.memory.harvest && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvest = false;
            creep.say('🔄 Haul!');
        }
        if (!creep.memory.harvest && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvest = true;
            creep.say('🚧 Harv!');
        }
        if (creep.memory.harvest) {
            creep.moveTo(Game.flags.source3);
            if (creep.pos.isNearTo(Game.flags.source3)){
                var source = creep.room.find(FIND_SOURCES);
                if (source.length) {
                    creep.moveTo(source[0]);
                    creep.harvest(source[0]);
                }
            }
        }
        else {
            creep.moveTo(5,31,'W46S41');
            var refill = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_LINK ||
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                }
            });
            if (refill.length) {
                refill.sort((b,a) => a.energy - b.energy);
                var close = creep.pos.findClosestByPath(refill);
                if (creep.pos.isNearTo(close)) {
                    creep.transfer(close, RESOURCE_ENERGY);
                }
                else {
                    creep.moveTo(close, { visualizePathStyle: { stroke: '#3D66FF' } });
                }
            }
        }
    }
};

module.exports = roleTrucker;
