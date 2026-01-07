Creep.prototype.sourceChoice = function sourceChoice() {
    const source = this.room.find(FIND_SOURCES);
    if (source.length >= 1) {
        var one = source[0].id;
        var two = source[1].id;
        var ones = one.pos.lookFor(LOOK_CREEPS);
        var twos = two.pos.lookFor(LOOK_CREEPS);
        console.log(ones, 'ones');
        console.log(twos, 'twos');

        if (ones.length >=3) {
            this.memory.sourceId = source[1].id;
        }
        else if (twos.length >=4 ) {
            this.memory.sourceId = source[0].id;
        }
        else {
            this.memory.sourceId = source[0].id;
        }
    }
    else {
        this.memory.sourceId = source[0].id;
    }
}

Creep.prototype.harvestEnergy = function harvestEnergy() {
    var storedSource = Game.getObjectById(this.memory.sourceId);
    if (this.pos.isNearTo(storedSource)) {
        this.harvest(storedSource);
    }
    else {
        this.moveTo(storedSource, { visualizePathStyle: { stroke: '#FF3D66' } });
    }
}

Creep.prototype.findAccu = function findAccu() {

    var accus = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (
                struct.structureType == STRUCTURE_EXTENSION ||
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
    }
}
Creep.prototype.seppuku = function seppuku() {

    var spawns = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_SPAWN)
        }
    });
    var spawn = spawns[0];
    if (this.room.memory['ALERT'] == true) {
        console.log('BANZAI!!!');

        if (this.pos.isNearTo(spawn)) {
            spawn[0].recycleCreep(this);
        }
        else {
            this.moveTo(spawn[0]);
        }
    }
    else {
        return
    }
}
Creep.prototype.immobilia = function immobilia() {
    if (!this.room.memory.immobilia) {
        _.set(this.room.memory['immobilia', 'towerlist'], towers);
        _.set(this.room.memory['immobilia', 'contilist'], contis);
        _.set(this.room.memory['immobilia', 'exislist'], exis);
        _.set(this.room.memory['immobilia', 'linklist'], links);
        _.set(this.room.memory['immobilia', 'spawnlist'], spawns);
        _.set(this.room.memory['immobilia', 'storagelist'], storage);


        var towers = this.room.find(FIND_STRUCTURES, {
            filter: (struct) => {
                return (struct.structureType == STRUCTURE_TOWER);
            }
        });

        var contis = this.room.find(FIND_STRUCTURES, {
            filter: (struct) => {
                return (struct.structureType == STRUCTURE_CONTAINER);
            }
        });

        var exis = this.room.find(FIND_STRUCTURES, {
            filter: (struct) => {
                return (struct.structureType == STRUCTURE_EXTENSION);
            }
        });

        var links = this.room.find(FIND_STRUCTURES, {
            filter: (struct) => {
                return (struct.structureType == STRUCTURE_LINK);
            }
        });

        var spawns = this.room.find(FIND_STRUCTURES, {
            filter: (struct) => {
                return (struct.structureType == STRUCTURE_SPAWN);
            }
        });

        var storage = this.room.find(FIND_STRUCTURES, {
            filter: (struct) => {
                return (struct.structureType == STRUCTURE_STORAGE);
            }
        });
    }
    else {
        return;
    }
}
