

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.role == 'harvester'){
            if (creep.memory.sourceId == null){
                creep.sourceChoice();
            }
            else{
                creep.harvestEnergy();
            }
        }
    }
};

module.exports = roleHarvester;
