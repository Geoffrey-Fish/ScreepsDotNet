var roleBuilder = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if (creep.memory.building == undefined) {
            console.log("Builder undefined!");
            creep.memory.building = true;
        }
        //creep.seppuku();

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 Reloading!');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 BOBDER!');
        }
        if (creep.memory.building) {
            var first = Game.getObjectById('624c8420b369a754778986b4');
            var second = Game.getObjectById('624c8421c59df279a2017d07');
            var third = Game.getObjectById('624c8422a3d173064159dd46');
            if (first == ConstructionSite){
                let boys = first.pos.lookFor(LOOK_CREEPS);
                if (boys.length <= 2) {
                    if (creep.pos.isNearTo(first)){
                        creep.build(first);
                    }
                    else{
                        creep.moveTo(first);
                    }
                }
            }
            else if (second == ConstructionSite){
                let boys = second.pos.lookFor(LOOK_CREEPS);
                if (boys.length <= 2) {
                    if (creep.pos.isNearTo(second)){
                        creep.build(second);
                    }
                    else{
                        creep.moveTo(second);
                    }
                }
            }
            else if (third == ConstructionSite){
                let boys = third.pos.lookFor(LOOK_CREEPS);
                if (boys.length <= 2) {
                    if (creep.pos.isNearTo(third)){
                        creep.build(third);
                    }
                    else{
                        creep.moveTo(third);
                    }
                }
            }
            var contis = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (struc) => struc.structureType == STRUCTURE_CONTAINER
            });

            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var targetsfree = _.forEach(targets, function (t) {
                return t.pos.getOpenPositions()
            });
            if (!first && !second && !third && contis.length) {
                if (creep.pos.isNearTo(contis[0])) {
                    creep.build(contis[0])
                }
                else {
                    creep.moveTo(contis[0], { visualizePathStyle: { lineStyle: 'dashed', stroke: '#f5fc06' } });
                }
            }
            else if (targetsfree.length) {
                var target = creep.pos.findClosestByPath(targetsfree);
                if (creep.pos.isNearTo(target)) {
                    creep.build(target);
                }
                else {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#D63DFF' } });
                }
            }
        }
        else {
           creep.findAccu();
            //--------------------------------------------------------------
            // var source = Game.getObjectById('5bbcaa8f9099fc012e631a1f')
            // if (creep.pos.isNearTo(source)){
            //     creep.harvest(source);
            // }
            // else{
            //     creep.moveTo(source);
            // }
            //------------------------------------------------------------------
            // var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
            //     filter: resource => resource.resourceType == RESOURCE_ENERGY
            //  });

            // if (droppedEnergy.length) {
            //     var closeDrop = creep.pos.findClosestByRange(droppedEnergy);
            //     if (creep.pos.isNearTo(closeDrop)) {
            //         creep.pickup(closeDrop);
            //     }
            //     else {
            //         creep.moveTo(closeDrop, { visualizePathStyle: { stroke: '#D3FF39' } });
            //     }
            // }
        }
    }
};

module.exports = roleBuilder;
