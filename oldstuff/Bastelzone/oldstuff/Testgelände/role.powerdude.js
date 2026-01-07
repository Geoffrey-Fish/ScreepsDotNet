var rolePowerDude = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.powering == undefined) {
            console.log("PowerDude undefined!");
            creep.memory.powering = true;
        }
        creep.seppuku();
        if (!creep.memory.powering && creep.store.getFreeCapacity() == 0) {
            creep.memory.powering = true ;
            creep.say('🚧 ');
        }
        if (creep.memory.powering && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.powering = false ;
                creep.say('🔄 ');
        }
        if (creep.memory.powering) {
            var Todos = creep.powerDistro();
            for (var i = 0; i < Todos.length; i++){
                if (Todos[i] == true) {

                }
            }
            var refill = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_LINK ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                }
            });
            if (refill.length) {
                refill.sort((b,a) => a.energy - b.energy);
                var close = creep.pos.findClosestByRange(refill);
                if (creep.pos.isNearTo(close)) {
                    creep.transfer(close, RESOURCE_ENERGY);
                }
                else {
                    creep.moveTo(close, { visualizePathStyle: { stroke: '#3D66FF' } });
                }
            }
        }
        else {
        }
    }
};

module.exports = rolePowerDude;




var list = [towerNeed, contisNeed, exisNeed, linksNeed, spawnsNeed];
