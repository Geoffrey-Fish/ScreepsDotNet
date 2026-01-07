var roleRepairer = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if(!creep.memory.repairing){
            creep.memory.repairing = true;
        };
        //If Tank empty, fill up
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
        }
        //if tank full, repair stuff
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
        }
        if (creep.memory.repairing) {
            let repairTargets;
            let repairTargetsRaw;
            let damagedStructsList = ['spawnlist', 'containerlist', 'towerlist','extensionslist', 'linklist', 'storagelist'];
            for (let listName of damagedStructsList) {
                let targetListIds = creep.room.memory.immobilia[listName];
                if (targetListIds) {
                    repairTargetsRaw = _.forEach(targetListIds, (target) => Game.getObjectById(target));
                    console.log('repRawOutput: '+ JSON.stringify(repairTargetsRaw));
                    repairTargets = _forEach(repairTargetsRaw, (target) => target.hits < target.hitsMax && target.structureType !== STRUCTURE_WALL && target.structureType !== STRUCTURE_RAMPART);
                    console.log('repTarOutput: '+ JSON.stringify(repairTargets));
                }
            }
            if (repairTargets.length) {
                let closest = creep.pos.findClosestByPath(nextRepairTargets);
                if (creep.pos.isNearTo(closest)) {
                    creep.transfer(closest, RESOURCE_ENERGY);
                    return; // Transfer to the closest target and exit the function
                } else {
                    creep.moveTo(closest, { visualizePathStyle: { lineStyle: 'dotted', stroke: '#CC0000' } });
                    return; // Move towards the closest target and exit the function
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
module.exports = roleRepairer;
