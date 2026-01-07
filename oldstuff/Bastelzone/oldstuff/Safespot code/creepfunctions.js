Creep.prototype.harvestEnergy = function harvestEnergy() {
    let storedSource = Game.getObjectById(this.memory.sourceId);
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
    let accus = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_LINK ||
                struct.structureType == STRUCTURE_STORAGE ||
                struct.structureType == STRUCTURE_CONTAINER) &&
                struct.store[RESOURCE_ENERGY] > 0;
        }
    });
    if (accus.length) {
        let closestAccu = this.pos.findClosestByRange(accus);
        if (this.pos.isNearTo(closestAccu)) {
            this.withdraw(closestAccu, RESOURCE_ENERGY);
        }
        else {
            this.moveTo(closestAccu, { visualizePathStyle: { stroke: '#FFD63D' } });
        }
    }
    else {
        this.moveTo(24, 35, 'W46S41');
    }
}
