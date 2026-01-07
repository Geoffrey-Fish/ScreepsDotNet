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
                filter: struct => struct.structureType == STRUCTURE_CONTAINER
            });
            if (contis.length) {
                var closestConti = creep.pos.findClosestByRange(contis);
                if (creep.pos.isNearTo(closestConti)) {
                    creep.build(closestConti);
                }
                else {
                    creep.moveTo(closestConti, { visualizePathStyle: { stroke: '#D63DFF' } });
                }
            }
            else {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    var target = creep.pos.findClosestByRange(targets);
                    if (creep.pos.isNearTo(target)) {
                        creep.build(target);
                    }
                    else {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#D63DFF' } });
                    }
                }
            }
        }
        else {
            creep.findAccu();
        }
    }
};

module.exports = roleBuilder;
