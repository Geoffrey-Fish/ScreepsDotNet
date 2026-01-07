var roleUpgrader = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.upgrading == undefined) {
            console.log("Upgrader undefined!");
            creep.memory.upgrading = true;
        }
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 reload');
        }
        else if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }
        if (creep.memory.upgrading) {
            if (creep.pos.isNearTo(creep.room.controller)) {
                creep.upgradeController(creep.room.controller);
            }
            else  {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#3827FF' } });
            }
        }
       else {
            creep.findAccu();
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

module.exports = roleUpgrader;
