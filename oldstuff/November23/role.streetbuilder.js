var streetbuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }
        else if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }
        if (creep.memory.building) {
            let streets = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: (site) => site.structureType == STRUCTURE_ROAD});
            if(streets.length > 0){
                console.log('streets to do: ' + streets.length)
                let closestStreet = creep.pos.findClosestByPath(streets);
                if (creep.pos.isNearTo(closestStreet)) {
                    creep.build(closestStreet);
                } else {
                    creep.moveTo(closestStreet, { visualizePathStyle: { lineStyle: 'dotted', stroke: '#CC0000' } }); // Move towards the closest target and exit the function
                }
                if (closestStreet.progress == closestStreet.progressTotal) {
                    creep.say('street finished');
                }
            }
        //No streets to build? Repair 'em
            else {
                let repairStreets = creep.room.find(FIND_STRUCTURES,{filter:(road) => road.structureType == STRUCTURE_ROAD && road.hits < road.hitsMax});
                console.log('stuck here'); 
                if (repairStreets.length > 0) {
                    console.log('streets to repair: ' + repairStreets.length);
                    let closest = creep.pos.findClosestByPath(repairStreets);
                    creep.say('Repair');
                    creep.say('Street');
                    if (creep.pos.isNearTo(closest)) {
                        creep.repair(closest);
                        return; // Transfer to the closest target and exit the function
                    } else {
                        creep.moveTo(closest, { visualizePathStyle: { lineStyle: 'dotted', stroke: '#CC0000' } });
                        return; // Move towards the closest target and exit the function
                    }
                }
            }
        }
        else {
            creep.findAccu();
        }
    }
};

module.exports = streetbuilder;
