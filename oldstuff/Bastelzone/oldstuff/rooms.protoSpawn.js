var getBody = require('rooms.spawning');

function createCustomCreep(Type, room) {
    var type = Type;

    if (type == 'harvester') {
        let number = _.get(room.memory, ['counter', 'harvester']);
        let newName = 'Harvy' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'harvester'], number);
        this.spawnCreep(getBody([WORK,WORK, MOVE], room), newName,
            { memory: { role: 'harvester', home: room } });
    }

    if (type == 'trucker') {
        let number = _.get(room.memory, ['counter', 'trucker']);
        let newName = 'Truck' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'trucker'], number);
        this.spawnCreep(getBody([WORK,CARRY,CARRY,MOVE,MOVE, MOVE], room), newName,
            { memory: { role: 'trucker', home: room } });
    }

    if (type == 'hauler') {
        let number = _.get(room.memory, ['counter', 'hauler']);
        let newName = 'Hauly' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'hauler'], number);
        this.spawnCreep(getBody([CARRY, MOVE], room), newName,
            { memory: { role: 'hauler', home: room } });
    }

    if (type == 'upgrader') {
        let number = _.get(room.memory, ['counter', 'upgrader']);
        let newName = 'Uppy' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'upgrader'], number);
        this.spawnCreep(getBody([WORK,CARRY, MOVE], room), newName,
            { memory: { role: 'upgrader', home: room } });
    }

    if (type == 'builder') {
        let number = _.get(room.memory, ['counter', 'builder']);
        let newName = 'Bob' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'builder'], number);
        this.spawnCreep(getBody([WORK,CARRY, MOVE], room), newName,
            { memory: { role: 'builder', home: room } });
    }

    if (type == 'repairer') {
        let number = _.get(room.memory, ['counter', 'repairer']);
        let newName = 'Repo' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'repairer'], number);
        this.spawnCreep(getBody([WORK,CARRY, MOVE], room), newName,
            { memory: { role: 'repairer', home: room } });
    }

    if (type == 'wallboy') {
        let number = _.get(room.memory, ['counter', 'wallboy']);
        let newName = 'WAllo' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'wallboy'], number);
        this.spawnCreep(getBody([HEAL, MOVE], room), newName,
            { memory: { role: 'wallboy', home: room } });
    }

    if (type == 'sattacker') {
        let number = _.get(room.memory, ['counter', 'sattacker']);
        let newName = 'Satta' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'sattacker'], number);
        this.spawnCreep(getBody([ATTACK,ATTACK,TOUGH,TOUGH,MOVE, MOVE], room), newName,
            { memory: { role: 'sattacker', home: room } });
    }

    if (type == 'lattacker') {
        let number = _.get(room.memory, ['counter', 'lattacker']);
        let newName = 'Latta' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'lattacker'], number);
        this.spawnCreep(getBody([RANGED_ATTACK,RANGED_ATTACK,TOUGH,TOUGH,MOVE, MOVE], room), newName,
            { memory: { role: 'lattacker', home: room } });
    }

     if (type == 'healer') {
        let number = _.get(room.memory, ['counter', 'healer']);
        let newName = 'Heal' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'healer'], number);
        this.spawnCreep(getBody([HEAL, MOVE], room), newName,
            { memory: { role: 'healer', home: room } });
    }
}

StructureSpawn.prototype.juiceUp = function juiceUp() {

    var sattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'sattacker');
    var oldsat = _.filter(sattackers, (creep) => creep.ticksToLive < 500);
    if (oldsat) {
        oldsat.sort((a, b) => a.ticksToLive - b.ticksToLive);
        this.renewCreep(oldsat[0]);
    }

    var lattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'lattacker');
    var oldlat = _.filter(lattackers, (creep) => creep.ticksToLive < 500);
    if (oldlat) {
        oldlat.sort((a, b) => a.ticksToLive - b.ticksToLive);
        this.renewCreep(oldlat[0]);
    }

    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    var oldheal = _.filter(healers, (creep) => creep.ticksToLive < 500);
    if (oldheal) {
        oldheal.sort((a, b) => a.ticksToLive - b.ticksToLive);
        this.renewCreep(oldheal[0]);
    }
}
