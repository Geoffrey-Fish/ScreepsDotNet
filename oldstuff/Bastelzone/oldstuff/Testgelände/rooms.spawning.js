
function getBody(segment, room) {
    let body = [];
    let segmentCost = _.sum(segment, s => BODYPART_COST[s]);
    let energyAvailable = room.energyAvailable;
    let maxSegments = Math.floor(energyAvailable / segmentCost);

    _.times(maxSegments, function () {
        _.forEach(segment, s => body.push(s));
    });
    // console.log(segmentCost,'cost',energyAvailable,'energy',maxSegments,'maxsegments')
    return body;
}

function spawning(room) {
    var spawns = room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_SPAWN }
    });
    spawns = _.filter(spawns, function (structure) {
        return !structure.spawning
    })
    if (!spawns.length) {
        return;
    }
    //spawns[0].juiceUp();
    var type = _.get(room.memory, ['TYPE'])

    if (type == 'harvester') {
        let number = _.get(room.memory, ['counter', 'harvester']);
        let newName = 'Harvy' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'harvester'], number);
        spawns[0].spawnCreep(getBody([WORK, MOVE], room), newName,
            { memory: { role: 'harvester', home: room } });
    }

    if (type == 'trucker') {
        let number = _.get(room.memory, ['counter', 'trucker']);
        let newName = 'Truck' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'trucker'], number);
        spawns[0].spawnCreep(getBody([WORK,CARRY,CARRY,MOVE,MOVE, MOVE], room), newName,
            { memory: { role: 'trucker', home: room } });
    }

    if (type == 'hauler') {
        let number = _.get(room.memory, ['counter', 'hauler']);
        let newName = 'Hauly' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'hauler'], number);
        spawns[0].spawnCreep(getBody([CARRY, MOVE], room), newName,
            { memory: { role: 'hauler', home: room } });
    }

    if (type == 'upgrader') {
        let number = _.get(room.memory, ['counter', 'upgrader']);
        let newName = 'Uppy' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'upgrader'], number);
        spawns[0].spawnCreep(getBody([WORK,CARRY,CARRY,MOVE,MOVE, MOVE], room), newName,
            { memory: { role: 'upgrader', home: room } });
    }

    if (type == 'builder') {
        let number = _.get(room.memory, ['counter', 'builder']);
        let newName = 'Bob' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'builder'], number);
        spawns[0].spawnCreep(getBody([WORK,WORK,CARRY,CARRY,MOVE, MOVE], room), newName,
            { memory: { role: 'builder', home: room } });
    }

    if (type == 'repairer') {
        let number = _.get(room.memory, ['counter', 'repairer']);
        let newName = 'Repo' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'repairer'], number);
        spawns[0].spawnCreep(getBody([WORK,WORK,CARRY, CARRY,MOVE, MOVE], room), newName,
            { memory: { role: 'repairer', home: room } });
    }

    if (type == 'wallboy') {
        let number = _.get(room.memory, ['counter', 'wallboy']);
        let newName = 'Wallo' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'wallboy'], number);
        spawns[0].spawnCreep(getBody([WORK,WORK,CARRY,CARRY,MOVE, MOVE], room), newName,
            { memory: { role: 'wallboy', home: room } });
    }
    if (type == 'powerdude') {
        let number = _.get(room.memory, ['counter', 'powerdude']);
        let newName = 'dude' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'powerdude'], number);
        spawns[0].spawnCreep(getBody([WORK,WORK,CARRY,CARRY,MOVE, MOVE], room), newName,
            { memory: { role: 'powerdude', home: room } });
    }

    if (type == 'sattacker') {
        let number = _.get(room.memory, ['counter', 'sattacker']);
        let newName = 'Satta' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'sattacker'], number);
        spawns[0].spawnCreep(getBody([ATTACK,ATTACK,TOUGH,TOUGH,MOVE, MOVE,MOVE,MOVE], room), newName,
            { memory: { role: 'sattacker', home: room } });
    }

    if (type == 'lattacker') {
        let number = _.get(room.memory, ['counter', 'lattacker']);
        let newName = 'Latta' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'lattacker'], number);
        spawns[0].spawnCreep(getBody([RANGED_ATTACK,RANGED_ATTACK,TOUGH,TOUGH,MOVE,MOVE,MOVE, MOVE], room), newName,
            { memory: { role: 'lattacker', home: room } });
    }

    if (type == 'healer') {
        let number = _.get(room.memory, ['counter', 'healer']);
        let newName = 'Heal' + number;
        number++; //not best,but I want it so
        _.set(room.memory, ['counter', 'healer'], number);
        spawns[0].spawnCreep(getBody([HEAL, MOVE,MOVE,MOVE], room), newName,
            { memory: { role: 'healer', home: room } });
    }
}
module.exports = spawning;
// Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], null,{role: 'harvester'}); Beispiel für manuell
