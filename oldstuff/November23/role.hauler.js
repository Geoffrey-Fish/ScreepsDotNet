var hauler = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (!creep.memory.spot) {
            creep.drops();
        };
        if(!creep.memory.hauling){
            creep.memory.hauling = true;
        };
        //Tank empty, search new drops
        if (creep.memory.hauling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.hauling = false;
            creep.say('Search');
            creep.say('Drops');
        };
        //If tank full, fill up all structures
        if (!creep.memory.hauling && creep.store.getFreeCapacity() == 0) {
            creep.memory.hauling = true;
            creep.say('Refilling');
            creep.say('Structures');
        };
        //The refilling command when tank full
        if (creep.memory.hauling) {
            creep.refill();
        }
        else {
            let list = creep.room.memory['openDrops'];
            if (list.length == 0) {
                console.log('building new openDrops list');
                creep.newSpots();
            }
            creep.drops();
        }
    }
};

module.exports = hauler;
