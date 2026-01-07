var creepFunctions = require('creepFunctions');
var roomPositionFunctions = require('roomPositionFunctions');
var roomsHub = require('rooms.hub');
var powerDistro = require('rooms.powerDistro');
var juiceUp = require('rooms.protoSpawn');


module.exports.loop = function () {

    roomsHub();
    //TESTZONE

    //TESTZONE

    global.ROLES = {
        harvester: require('role.harvester'),
        trucker: require('role.trucker'),
        hauler: require('role.hauler'),
        builder: require('role.builder'),
        upgrader: require('role.upgrader'),
        repairer: require('role.repairer'),
        wallboy: require('role.wallboy'),
        sattacker: require('role.sattacker'),
        lattacker: require('role.lattacker'),
        healer: require('role.healer')
    }

    for (var name in Memory.creeps) {
        let creep = Game.creeps[name];
        if (!creep) {
            delete Memory.creeps[name];
        } else {
            ROLES[creep.memory.role].run(creep);
        }
    }
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        console.log('I SPAWN RIGHT NOW');
        Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y + 2,
            { align: 'center', opacity: 1.0 });
    }
}
