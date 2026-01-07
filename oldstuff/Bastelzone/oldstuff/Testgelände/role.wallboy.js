var roleWallBoy = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.walling == undefined) {
            console.log("WallBoy undefined!");
            creep.memory.walling = true;
        }
        creep.seppuku();
        if (creep.memory.walling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.walling = false;
            creep.say('🔄 Charge!');
        }

        if (!creep.memory.walling && creep.store.getFreeCapacity() == 0) {
            creep.memory.walling = true;
            creep.say('🚧 Walls!');
        }

        if (creep.memory.walling) {
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (struct) => {
                    return struct.structureType == STRUCTURE_WALL
                }
            });
            var wall = _.filter(walls, (wall) => wall.hits < 15000);
            wall.sort((a, b) => a.hits - b.hits);
            if (wall.length) {
                if (creep.pos.isNearTo(wall[0])) {
                    creep.repair(wall[0]);
                }
                else {
                    creep.moveTo(wall[0], { visualizePathStyle: { stroke: '#FF6539' } });
                }
            }
            else {
                var rotts = creep.room.find(FIND_STRUCTURES, {
                    filter: (struct) => {
                        return ((struct.hits < struct.hitsMax) && struct.structureType !== STRUCTURE_WALL)
                    }
                });
                rotts.sort((a, b) => a.hits - b.hits);
                if (rotts.length) {
                    if (creep.pos.isNearTo(rotts[0])) {
                        creep.repair(rotts[0]);
                    }
                    else {
                        creep.moveTo(rotts[0], { visualizePathStyle: { stroke: '#D3FF39' } });
                    }
                }
            }
        }
        else {
            creep.findAccu();

        }
    }
};
module.exports = roleWallBoy;
