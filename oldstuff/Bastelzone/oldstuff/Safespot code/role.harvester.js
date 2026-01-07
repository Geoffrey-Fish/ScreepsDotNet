var roleHarvester = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.role == 'harvester') {
            creep.memory.work = true;
        }
        if (creep.memory.work) {
            creep.harvestEnergy();
        }
    }
};

module.exports = roleHarvester;
