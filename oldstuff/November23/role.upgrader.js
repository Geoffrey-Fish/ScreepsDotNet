var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
        }
        else if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
        }
        if (creep.memory.upgrading) {
            if (creep.pos.isNearTo(creep.room.controller)) {
                creep.upgradeController(creep.room.controller);
            }
            else  {
                creep.moveTo(creep.room.controller, { visualizePathStyle: {linestyle: 'solid', stroke: '#000000' } });
            }
        }
        else {
            creep.findAccu();
        }
    }
};
module.exports = roleUpgrader;
