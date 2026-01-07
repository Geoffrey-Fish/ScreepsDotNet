Creep.prototype.sourceChoice = function sourceChoice() {
    source = this.room.find(FIND_SOURCES);
    if (source.length >= 1) {
        let one = source[1].id;
        let two = source[0].id;
        let onE = _.filter(Game.creeps, (creep) => creep.memory.sourceId == one);
        let twO = _.filter(Game.creeps, (creep) => creep.memory.sourceId == two);
        console.log(one,'one',two,'two')
        if ( !source[1].pos.getOpenPositions().length) {
            this.memory.sourceId = two;
        }
        else if (!source[0].pos.getOpenPositions().length) {
            this.memory.sourceId = one;
        }
        else {
            this.memory.sourceId = one;
        }
    }
    else {
        let one = Game.getObjectById(source[0]);
        this.memory.sourceId = one;
    }
}

Creep.prototype.harvestEnergy = function harvestEnergy() {
    var storedSource = Game.getObjectById(this.memory.sourceId);
    if ( !storedSource) {
        storedSource = this.sourceChoice();
    }
    if (storedSource) {
        if (this.pos.isNearTo(storedSource)) {
            this.harvest(storedSource);
        }
        else {
            this.moveTo(storedSource, { visualizePathStyle: { stroke: '#FF3D66' } });
        }
    }
}

Creep.prototype.findAccu = function findAccu() {

    var accus = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (
                struct.structureType == STRUCTURE_TOWER ||
                struct.structureType == STRUCTURE_CONTAINER ||
                struct.structureType == STRUCTURE_LINK ||
                struct.structureType == STRUCTURE_STORAGE) &&
                struct.store[RESOURCE_ENERGY] > 0;
        }
    });
    if (accus.length) {
        var closestAccu = this.pos.findClosestByRange(accus);
        if (this.pos.isNearTo(closestAccu)) {
            this.withdraw(closestAccu, RESOURCE_ENERGY);
        }
        else {
            this.moveTo(closestAccu, { visualizePathStyle: { stroke: '#FFD63D' } });
        }
    }
}
//Build a global safe for the energy list so no two screeps go to the same thing
// Creep.prototype.droppedEnergy = function droppedEnergy() {
//     var droppedEnergy = this.room.find(FIND_DROPPED_RESOURCES, {
//         filter: resource => resource.resourceType == RESOURCE_ENERGY
//     });

//     if (droppedEnergy.length) {
//       var drops = this.pos.findClosestByPath(droppedEnergy);
//       this.memory.drops = drops;
//     }
//     else{
//         this.memory.drops = null;
//     }
// }

Creep.prototype.destinationChoice = function destinationChoice() {
    if (!this.memory.target){
        let one = Game.flags.source1;
        let two = Game.flags.source4;
        let three = Game.flags.source2;
        let onE = _.filter(Game.creeps, (creep) => creep.memory.target == one);
        let twO = _.filter(Game.creeps, (creep) => creep.memory.target == two);
        let threE = _.filter(Game.creeps, (creep) => creep.memory.target == three);


        if (onE.length >= 1) {
            this.memory.target = three;
        }
        if (threE.length>= 2) {
            this.memory.target = two;
        }
        if ( twO.length >= 2) {
            this.memory.target = one;
        }
        else{
            this.memory.target = one;
        }
        console.log(onE,'one',twO,'two',threE,'three')
    }
}
