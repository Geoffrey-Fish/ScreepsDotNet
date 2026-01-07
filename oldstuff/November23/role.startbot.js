var startbot = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.room.memory.counter) {
            creep.room.memory.counter = 0;
        }
        if (!creep.room.memory.immobilia) {
            creep.immobilia();
            creep.room.memory.immobilia.spawnlist = [];
            creep.room.memory.immobilia.containerlist = [];

            creep.room.memory.immobilia.towerlist = [];
            creep.room.memory.immobilia.extensionslist = [];
            creep.room.memory.immobilia.linklist = [];
            creep.room.memory.immobilia.storagelist = [];
  
        }
        //And hence, no openDrops list
        if (!creep.room.memory.openDrops) {
            this.room.memory.openDrops = [];
        }
        //Nor a TYPE sign
        if (!creep.room.memory.TYPE) {
            creep.room.memory.TYPE = 'harvester';
        }
        //And this is the Max places of available harvesting spots
        if (!creep.room.memory.harvesterSpots) {
            creep.room.memory.harvesterSpots = 0;
        }
        if (!creep.room.memory.census) {
        creep.room.memory.census = {
            'harvester': 4,
            'hauler': 2,
            'upgrader': 2,
            'builder': 2,
            'repairer': 1,
            'streetbuilder':2
        };
    };
        creep.harvestEnergy();
    }
};

module.exports = startbot;
