var roleBuilder = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.building == undefined) {
            console.log("Builder undefined!");
            creep.memory.building = true;
        }
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 Reloading!');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 BOBDER!');
        }
        if (creep.memory.building) {
            var contis = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (struc) => struc.structureType == STRUCTURE_CONTAINER
            })
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var targetsfree = _.forEach(targets, function (t) {
                return t.pos.getOpenPositions()
            });
            if (contis.length) {
                if (creep.pos.isNearTo(contis[0])) {
                    creep.build(contis[0])
                }
                else {
                    creep.moveTo(contis[0], { visualizePathStyle: { stroke: '#3D66FF' } });
                }
            }
            else if (targetsfree.length) {
                var target = creep.pos.findClosestByPath(targetsfree);
                if (creep.pos.isNearTo(target)) {
                    creep.build(target);
                }
                else {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#D63DFF' } });
                }
            }
        }
        else {
          // creep.findAccu();

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

module.exports = roleBuilder;
