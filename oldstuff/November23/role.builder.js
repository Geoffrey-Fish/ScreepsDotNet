var builder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if(!creep.memory.building){
            creep.memory.building = false;
        }
        //No power, reload
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }
        //Reloaded, ready to rumble
        else if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }
        if (creep.memory.building) {
            let containers = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: (container) => container.structureType == STRUCTURE_CONTAINER});
            let constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
            
            if (containers.length > 0) {
                let closestContainer = creep.pos.findClosestByPath(containers);
                if(closestContainer){
                    if (creep.pos.isNearTo(closestContainer)) {
                        creep.build(closestContainer);
                        if (closestContainer.progress == closestContainer.progressTotal) {
                            creep.say('Build OK');
                            //Add to the list
                            creep.immobilia();
                        }
                    }
                    else {
                        creep.moveTo(closestContainer, {visualizePathStyle:{lineStyle: 'dashed',stroke: '#F1FF26'}})
                    }
                }
                else{
                    return;
                }
            }
            else if(!containers.length && constructions.length > 0){
                let closestConstruction = creep.pos.findClosestByPath(constructions);
                if (creep.pos.isNearTo(closestConstruction)) {
                    creep.build(closestConstruction);
                    if (closestConstruction.progress == closestConstruction.progressTotal) {
                        creep.say('Build OK');
                        //Add to the list
                        creep.immobilia();
                    }
                }
                else {
                    creep.moveTo(closestConstruction, { visualizePathStyle:{lineStyle:'dashed',stroke:'#F1FF26'}})
                }
            }
            else{
                const path = creep.pos.findPathTo(Game.flags.Flag1);
                if(path.length > 0) {
                    creep.move(path[0].direction);
                }
            }
        }
        else {
            creep.findAccu();
        }
    }
};

module.exports = builder;
