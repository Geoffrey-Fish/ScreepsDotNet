var wallboy = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (!creep.memory.walling) {
            creep.memory.walling = true;
        }
        if (!creep.memory.walling && creep.store.getFreeCapacity() == 0) {
            creep.memory.walling = true;
            creep.say('🚧 Walls!');
        }
        if (creep.memory.walling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.walling = false;
            creep.say('🔄 Recharge!');
        }
        if (!creep.memory.walling) {
            creep.findAccu();
        }
        else {
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (struct) => {
                    return (struct.structureType == (STRUCTURE_WALL && (struct.hits < 10000)))
                }
            });
            walls.sort((a, b) => a.hits - b.hits);
            if (walls.length) {
                var wall = creep.pos.findClosestByPath(walls);
                if (creep.pos.isNearTo(wall)) {
                    creep.repair(wall);
                    if(wall.hits >= 12000){
                        creep.say("This Wall done!");
                        return;
                    }
                }
                else {
                    creep.moveTo(wall, { visualizePathStyle: { stroke: '#FF6539' } });
                }
            }
        }
    }
};
module.exports = wallboy;
