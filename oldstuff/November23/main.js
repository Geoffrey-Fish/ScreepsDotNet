var creepfunctions = require('rooms.creepfunctions');
var roomsHub = require('rooms.hub');
var customCreepCheck = require('rooms.customCreepCheck');
var spawning = require('rooms.spawning');

module.exports.loop = function () {

    global.ROLES = {
        harvester: require('role.harvester'),
        hauler: require('role.hauler'),
        builder: require('role.builder'),
        upgrader: require('role.upgrader'),
        repairer: require('role.repairer'),
        streetbuilder: require('role.streetbuilder'),
        wallboy: require('role.wallboy'),
        startbot: require('role.startbot')
    }
    for (var name in Memory.creeps) {
        let creep = Game.creeps[name];
        if (!creep) {
            delete Memory.creeps[name];
        }
        else {
            ROLES[creep.memory.role].run(creep);
        }
    }
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        console.log('I SPAWN RIGHT NOW');
        Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 2,
            Game.spawns['Spawn1'].pos.y + 2,
            { align: 'center', opacity: 0.6 });
    }
    roomsHub();
};
