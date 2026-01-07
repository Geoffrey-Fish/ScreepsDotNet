var roleUpgrader = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.upgrading == undefined) {
            console.log("Upgrader undefined!");
            creep.memory.upgrading = true;
        }
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡');
        }
        if (creep.memory.upgrading) {
            var control = creep.room.find(STRUCTURE_CONTROLLER);
            if (creep.pos.isNearTo(control)) {
                creep.upgradeController(control);
            }
            else {
                creep.moveTo(control, { visualizePathStyle: { stroke: '#3827FF' } });
            }
        } else {
            creep.findAccu();
        }
    }
};

module.exports = roleUpgrader;
