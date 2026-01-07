function getBody(segment, room) {
    let body = [];
    let segmentCost = _.sum(segment, s => BODYPART_COST[s]);
    let energyAvailable = room.energyAvailable;
    let maxSegments = Math.floor(energyAvailable / segmentCost);

    _.times(maxSegments, function () {
        _.forEach(segment, s => body.push(s));
    });
    console.log(body, energyAvailable, segmentCost, maxSegments);
    return body;
}

function spawning(room) {

    let spawns = room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_SPAWN }
    });

    spawns = _.filter(spawns, function (structure) {
        return !structure.spawning
    })
    if (!spawns.length) {
        return;
    }

    let harvesterTarget = _.get(room.memory, ['census', 'harvester'], 3);
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length <= harvesterTarget) {
        var newName = 'Harvester' + Game.time;
        let result = spawns[0].spawnCreep(getBody([WORK, WORK, MOVE], room), newName,
            { memory: { role: 'harvester', source: null, targetRoom: room.name, homeRoom: room.name } });
        if (result == OK) {
            return;
        }
    }

    let haulerTarget = _.get(room.memory, ['census', 'hauler'], 1);
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    if (haulers.length < haulerTarget) {
        var newName = 'Hauler' + Game.time;
        let result = spawns[0].spawnCreep(getBody([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], room), newName,
            { memory: { role: 'hauler', source: null, targetRoom: room.name, homeRoom: room.name } });
        if (result == OK) {
            return;
        }
    }

    let builderTarget = _.get(room.memory, ['census', 'builder'], 3);
    let buildSites = room.find(FIND_CONSTRUCTION_SITES);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (buildSites.length > 0 && builders.length < builderTarget) {
        var newName = 'Builder' + Game.time;
        let result = spawns[0].spawnCreep(getBody([WORK, WORK, CARRY, CARRY, MOVE, MOVE], room), newName,
            { memory: { role: 'builder', targetRoom: null, homeRoom: room.name } });
        if (result == OK) {
            return;
        }
    }
    let upgraderTarget = _.get(room.memory, ['census', 'upgrader'], 2);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < upgraderTarget) {
        var newName = 'Upgrader' + Game.time;
        let result = spawns[0].spawnCreep(getBody([WORK, WORK, CARRY, CARRY, MOVE, MOVE], room), newName,
            { memory: { role: 'upgrader', targetRoom: null, homeRoom: room.name } });
        if (result == OK) {
            return;
        }
    }
    let repairerTarget = _.get(room.memory, ['census', 'repairer'], 2);
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    if (repairers.length < repairerTarget) {
        var newName = 'Repairer' + Game.time;
        let result = spawns[0].spawnCreep(getBody([WORK, WORK, CARRY, CARRY, MOVE, MOVE], room), newName,
            { memory: { role: 'repairer', targetRoom: null, homeRoom: room.name } });
        if (result == OK) {
            return;
        }
    }
    let sattackerTarget = _.get(room.memory, ['census', 'sattacker'], 3);
    var sattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'sattacker');
    if (sattackers.length < sattackerTarget) {
        var newName = 'Sattacker' + Game.time;
        let result = spawns[0].spawnCreep(getBody([ATTACK, ATTACK, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH], room), newName,
            { memory: { role: 'sattacker', targetRoom: null, homeRoom: room.name } });
        if (result == OK) {
            return;
        }
    }
    let lattackerTarget = _.get(room.memory, ['census', 'lattacker'], 3);
    var lattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'lattacker');
    if (lattackers.length < lattackerTarget) {
        var newName = 'Lattacker' + Game.time;
        let result = spawns[0].spawnCreep(getBody([RANGED_ATTACK, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], room), newName,
            { memory: { role: 'lattacker', targetRoom: null, homeRoom: room.name } });
        if (result == OK) {
            return;
        }
    }
    let healerTarget = _.get(room.memory, ['census', 'healer'], 3);
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    if (healers.length < healerTarget) {
        var newName = 'Healer' + Game.time;
        let result = spawns[0].spawnCreep(getBody([HEAL, MOVE], room), newName,
            { memory: { role: 'healer', targetRoom: null, homeRoom: room.name } });
        if (result == OK) {
            return;
        }
    }
    let energyMinerTarget = _.get(room.memory, ['census', 'energyMiner'], 3);
    var energyMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'energyMiner');
    if (energyMiners.length < energyMinerTarget) {
        var newName = 'EnergyMiner' + Game.time;
        let result = spawns[0].spawnCreep(getBody([WORK, WORK, CARRY, CARRY, MOVE, MOVE], room), newName,
            { memory: { role: 'energyMiner', source: null, targetRoom: room.name, homeRoom: room.name } });
        if (result == OK) {
            return;
        }
    }
    if (Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y + 1,
            { align: 'center', opacity: 0.8 });
    }

}

module.exports = spawning;
// Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], null,{role: 'harvester'}); Beispiel für manuell
