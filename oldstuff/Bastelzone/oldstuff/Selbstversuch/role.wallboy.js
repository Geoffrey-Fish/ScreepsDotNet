var roleWallBoy = {

    /** @param {Creep} creep **/

    run: function (creep) {

        if (creep.memory.walling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.walling = false;
            creep.say('🔄 Charge!');
        }

        if (!creep.memory.walling && creep.store.getFreeCapacity() == 0) {
            creep.memory.walling = true;
            creep.say('🚧 Walls!');
        }

        if (creep.memory.walling) {

            //Declaration of all different search jobs
            //First search for Walls to build
            let buildWalls = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter:
                    (struc) => struc.structureType == STRUCTURE_WALL
            });

            //Then, search for walls to buff up
            let walls = creep.room.find(FIND_STRUCTURES, {
                filter: (struct) => {
                    return struct.structureType == STRUCTURE_WALL// && struct.structureType == STRUCTURE_RAMPART
                }
            });
            let wall = _.filter(walls, (wall) => wall.hits < 15000);


            //finally, do something usefull with your life
            let ramps = creep.room.find(FIND_STRUCTURES, {
                filter: (struct) => {
                    return (struct.structureType == STRUCTURE_RAMPART && struct.hits < struct.hitsMax)
                }
            });
            let rotts = creep.room.find(FIND_STRUCTURES, {
                filter: (struct) => {
                    return ((struct.hits < struct.hitsMax) && struct.structureType !== STRUCTURE_WALL)
                }
            });
            rotts.sort((a, b) => a.hits - b.hits);


            if (buildWalls.length) {
                if (creep.pos.isNearTo(buildWalls[0])) {
                    creep.build(buildWalls[0]);
                }
                else {
                    creep.moveTo(buildWalls[0], { visualizePathStyle: { lineStyle: 'solid', stroke: '#5FF9F9' } });
                }
            }
            else if (wall.length) {
                if (creep.pos.isNearTo(wall[0])) {
                    creep.repair(wall[0])
                }
                else {
                    creep.moveTo(wall[0], { visualizePathStyle: { lineStyle: 'solid', stroke: '#5FF9F9' } })
                }
            }
            else if (ramps.length) {
                if (creep.pos.isNearTo(ramps[0])) {
                    creep.repair(ramps[0])
                }
                else {
                    creep.moveTo(ramps[0],{visualizePathStyle:{lineStyle: 'solid',stroke: '#5FF9F9'}});
                }
            }
            else if (rotts.length) {
                if (creep.pos.isNearTo(rotts[0])) {
                    creep.repair(rotts[0]);
                }
                else {
                    creep.moveTo(rotts[0], { visualizePathStyle: { lineStrike: 'solid', stroke: '#5FF9F9' } });
                }
            }
            else {
                creep.findAccu();
            }
        }
        else {
            creep.findAccu();
        }
    }
};
module.exports = roleWallBoy;
