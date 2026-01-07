// Funktionstest 09.03.2022 10:30
var creepFunctions = require('creepfunctions');
var roomPositionFunctions = require('roompositionfunctions');
var _ = require('lodash');


module.exports.loop = function () {

    //TESTZONE


    //TESTZONE

    _.forEach(Game.rooms, function (room) {

        if (room && room.controller && room.controller.my) {

            let harvesterTarget = _.get(room.memory, ['census', 'harvester'], 3);
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            if (harvesters.length <= harvesterTarget) {
                var newName = 'Harvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE], newName,
                    { memory: { role: 'harvester', source: null, targetRoom: room.name, homeRoom: room.name } });
            }

            let haulerTarget = _.get(room.memory, ['census', 'hauler'], 1);
            var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
            if (haulers.length < haulerTarget) {
                var newName = 'Hauler' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                    { memory: { role: 'hauler', source: null, targetRoom: room.name, homeRoom: room.name } });
            }

            let builderTarget = _.get(room.memory, ['census', 'builder'], 3);
            let buildSites = room.find(FIND_CONSTRUCTION_SITES);
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            if (buildSites.length > 0 && builders.length < builderTarget) {
                var newName = 'Builder' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'builder', targetRoom: null, homeRoom: room.name } });
            }

            let upgraderTarget = _.get(room.memory, ['census', 'upgrader'], 2);
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            if (upgraders.length < upgraderTarget) {
                var newName = 'Upgrader' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'upgrader', targetRoom: null, homeRoom: room.name } });
            }

            let repairerTarget = _.get(room.memory, ['census', 'repairer'], 2);
            var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            if (repairers.length < repairerTarget) {
                var newName = 'Repairer' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'repairer', targetRoom: null, homeRoom: room.name } });
            }

            let sattackerTarget = _.get(room.memory, ['census', 'sattacker'], 3);
            var sattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'sattacker');
            if (sattackers.length < sattackerTarget) {
                var newName = 'Sattacker' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([ATTACK, MOVE, MOVE], newName,
                    { memory: { role: 'sattacker', targetRoom: null, homeRoom: room.name } });
            }

            let lattackerTarget = _.get(room.memory, ['census', 'lattacker'], 3);
            var lattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'lattacker');
            if (lattackers.length < lattackerTarget) {
                var newName = 'Lattacker' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([ATTACK, MOVE], newName,
                    { memory: { role: 'lattacker', targetRoom: null, homeRoom: room.name } });
            }

            let healerTarget = _.get(room.memory, ['census', 'healer'], 3);
            var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
            if (healers.length < healerTarget) {
                var newName = 'Healer' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([HEAL, CARRY, MOVE], newName,
                    { memory: { role: 'healer', targetRoom: null, homeRoom: room.name } });
            }

            let energyMinerTarget = _.get(room.memory, ['census', 'energyMiner'], 3);
            var energyMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'energyMiner');
            if (energyMiners.length < energyMinerTarget) {
                var newName = 'EnergyMiner' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'energyMiner', source: null, targetRoom: room.name, homeRoom: room.name } });
            }
        }
    })

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        console.log('I SPAWN RIGHT NOW');
        Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 2,
            Game.spawns['Spawn1'].pos.y + 2,
            { align: 'center', opacity: 0.6 });
    }
    global.ROLES = {
        harvester: require('role.harvester'),
        hauler: require('role.hauler'),
        builder: require('role.builder'),
        upgrader: require('role.upgrader'),
        repairer: require('role.repairer'),
        sattacker: require('role.sattacker'),
        lattacker: require('role.lattacker'),
        healer: require('role.healer'),
        energyMiner: require('role.energyMiner')
    }

    for (var name in Memory.creeps) {
        let creep = Game.creeps[name];
        if (!creep) {
            delete Memory.creeps[name];
        } else {
            ROLES[creep.memory.role].run(creep);
        }
    }

}
