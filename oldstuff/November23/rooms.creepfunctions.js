//Job description: Harvest Energy!
Creep.prototype.harvestEnergy = function harvestEnergy() {
    if (!this.memory.sourceId) {
        this.sourceChoice();
    }
    let storedSource = Game.getObjectById(this.memory.sourceId);
    if (!storedSource) {
        console.log('Error: storedSource is not valid.');
        return;
    }
    if (this.pos.isNearTo(storedSource)) {
        this.harvest(storedSource);
    } else {
        this.moveTo(storedSource, { visualizePathStyle: { lineStyle: 'solid', stroke: '#FFFFFF' } });
    }
};

//New harvester will get a designation to work at.
Creep.prototype.sourceChoice = function sourceChoice() {
    if (!this.room.memory.immobilia) {
        console.log('sourceChoice found no immobilia list.Create new one.');
        this.immobilia();
        return;
    }
    // If there was no sourceId, now there is.
    if (!this.memory.sourceId) {
        this.memory.sourceId = '';
    }
    // If there's more than one source of energy
    if (this.room.memory.immobilia.sourcelist.length >= 1) {
        console.log(this.name + 'starting sourceChoice routine...');
        let sourceOne = Game.getObjectById(this.room.memory.immobilia.sourcelist[0]);
        let sourceTwo = Game.getObjectById(this.room.memory.immobilia.sourcelist[1]);

        const target = this.pos.findClosestByPath([sourceOne, sourceTwo])
        this.memory.sourceId = target.id;
    }
    // if there is only one source of energy
    else {
        let sourceOne = Game.getObjectById(this.room.memory.immobilia.sourcelist[0]);
        this.memory.sourceId = sourceOne.id;
    }
};

//Energy dropped by the harvesters
Creep.prototype.drops = function drops() {
    if (!this.memory.spot) {
        this.memory.spot = {};
    }
    if (this.memory.spot) {
        let drop = Game.getObjectById(this.memory.spot);
        if (!drop) {
            this.spotting();
        }
        if (this.pos.isNearTo(drop)) {
            this.pickup(drop);
        } else {
            this.moveTo(drop, { visualizePathStyle: { lineStyle: 'dashed', stroke: '#330066' } });
        }
    } else {
        this.spotting();
    }
};

//Search for dropped energy from the harvesters
Creep.prototype.spotting = function spotting() {
    let dropSpot = _.get(this.room.memory, ['openDrops']);
    if (!dropSpot || dropSpot.length === 0) {
        this.newSpots();
        return;
    }
    // Take the last entry from the list and erase it from the list
    this.memory.spot = dropSpot.shift();
    _.set(this.room.memory, ['openDrops'], dropSpot);
};

//Create new List of dropped energy from harvesters
Creep.prototype.newSpots = function newSpots() {

    let droppedEnergy = this.room.find(FIND_DROPPED_RESOURCES, {
        filter: (resource) => resource.resourceType === RESOURCE_ENERGY
    });
    let dropArray = [];
    for (let i = 0; i < droppedEnergy.length; i++) {
        dropArray.push(droppedEnergy[i].id);
    }
    _.set(this.room.memory, ['openDrops'], dropArray);
};

//Juice back up yourself, little creeper
Creep.prototype.findAccu = function findAccu() {
    let accuLists = ['containerlist', 'extensionlist', 'linklist', 'storagelist','spawnlist'];
    for (let listName of accuLists) {
        let targetListIds = this.room.memory.immobilia[listName];
        if (targetListIds) {
            let nextAccuTargets = targetListIds
                .map(targetId => Game.getObjectById(targetId))
                .filter(target => target && target.store[RESOURCE_ENERGY] > 0);
            if (nextAccuTargets.length > 0) {
                let closest = this.pos.findClosestByPath(nextAccuTargets);
                if (this.pos.isNearTo(closest)) {
                    this.withdraw(closest, RESOURCE_ENERGY);
                    return; // Transfer to the closest target and exit the function
                } else {
                    this.moveTo(closest, { visualizePathStyle: { lineStyle: 'solid', stroke: '#CC0000' } });
                    return; // Move towards the closest target and exit the function
                }
            }
        }
    }
};

//Candyman does the deeds and fills em all up
Creep.prototype.refill = function refill() {
    // Iterate over each list and find the closest target
    let targetLists = ['towerlist', 'containerlist', 'extensionslist', 'linklist', 'spawnlist', 'storagelist'];

    for (let listName of targetLists) {

        let targetListIds = this.room.memory.immobilia[listName];
        if (targetListIds) {
            let nextRefillTargets = targetListIds
                .map(targetId => Game.getObjectById(targetId))
                .filter(target => target && target.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            
            if (nextRefillTargets.length > 0) {
                let closest = this.pos.findClosestByPath(nextRefillTargets);
                if (this.pos.isNearTo(closest)) {
                    this.transfer(closest, RESOURCE_ENERGY);
                    return; // Transfer to the closest target and exit the function
                } else {
                    this.moveTo(closest, { visualizePathStyle: { lineStyle: 'solid', stroke: '#CC0000' } });
                    return; // Move towards the closest target and exit the function
                }
            }
        }
    }
};



//This is a scanner function for all objects in the room, and put their ids in lists
Creep.prototype.immobilia = function immobilia() {
    if(!this.room.memory.immobilia){
        this.room.memory.immobilia = {};
    }
    let structs = this.room.find(FIND_STRUCTURES);
    _.forEach(structs, (struct) => {
        switch (struct.structureType) {
            case STRUCTURE_TOWER:
                //First check is there is a list in memory
                if (!this.room.memory.immobilia.towerlist) {
                    this.room.memory.immobilia.towerlist = [];
                }
                if (!this.room.memory.immobilia.towerlist.includes(struct.id)) {
                    this.room.memory.immobilia.towerlist.push(struct.id);
                }
                break;
            case STRUCTURE_CONTAINER:
                //First check is there is a list in memory
                if (!this.room.memory.immobilia.containerlist) {
                    this.room.memory.immobilia.containerlist = [];
                }
                if (!this.room.memory.immobilia.containerlist.includes(struct.id)) {
                    this.room.memory.immobilia.containerlist.push(struct.id);
                }
                break;
            case STRUCTURE_EXTENSION:
                //First check is there is a list in memory
                if (!this.room.memory.immobilia.extensionslist) {
                    this.room.memory.immobilia.extensionslist = [];
                }
                if (!this.room.memory.immobilia.extensionslist.includes(struct.id)) {
                    this.room.memory.immobilia.extensionslist.push(struct.id);
                }
                break;
            case STRUCTURE_LINK:
                //First check is there is a list in memory
                if (!this.room.memory.immobilia.linklist) {
                    this.room.memory.immobilia.linklist = [];
                }
                if (!this.room.memory.immobilia.linklist.includes(struct.id)) {
                    this.room.memory.immobilia.linklist.push(struct.id);
                }
                break;
            case STRUCTURE_SPAWN:
                //First check is there is a list in memory
                if (!this.room.memory.immobilia.spawnlist) {
                    this.room.memory.immobilia.spawnlist = [];
                }
                if (!this.room.memory.immobilia.spawnlist.includes(struct.id)) {
                    this.room.memory.immobilia.spawnlist.push(struct.id);
                }
                break;
            case STRUCTURE_STORAGE:
                //First check is there is a list in memory
                if (!this.room.memory.immobilia.storagelist) {
                    this.room.memory.immobilia.storagelist = [];
                }
                if (!this.room.memory.immobilia.storagelist.includes(struct.id)) {
                    this.room.memory.immobilia.storagelist.push(struct.id);
                }
                break;
        }
    });
    //Finally, a list of the sources
    let sources = this.room.find(FIND_SOURCES);
    //First check is there is a list in memory
    if (!this.room.memory.immobilia.sourcelist) {
        this.room.memory.immobilia.sourcelist = [];
    };
    let sourceIds = _.map(sources, (source) => source.id);
    this.room.memory.immobilia.sourcelist = sourceIds;
}

