var roleHauler = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.hauling == undefined) {
            console.log("Hauler undefined!");
           // creep.destinationChoice();
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
            // var goto = creep.memory.target;
            // creep.moveTo(goto);
            // if (creep.pos.isNearTo(goto)){

           // }
            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
             });

            if (droppedEnergy.length) {
                droppedEnergy.sort((b,a) => a.energy - b.energy);
                if (creep.pos.isNearTo(droppedEnergy[0])){
                    creep.pickup(droppedEnergy[0]);
                }
                else{
                    creep.moveTo(droppedEnergy[0], { visualizePathStyle: { stroke: '#3D66FF' } });
                }
            }
        }
        else {
            //let receiveList = creep.powerDistro();
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
            else {
                creep.moveTo(40,28,'W46S41')
            }
        }
    }
};

module.exports = roleHauler;
