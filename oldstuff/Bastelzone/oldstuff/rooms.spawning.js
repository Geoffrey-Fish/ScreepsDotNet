var customCreepCheck = require('rooms.customCreepCheck');

function getBody(segment, room) {
    let body = [];
    let segmentCost = _.sum(segment, s => BODYPART_COST[s]);
    let energyAvailable = room.energyAvailable;
    let maxSegments = Math.floor(energyAvailable / segmentCost);

    _.times(maxSegments, function () {
        _.forEach(segment, s => body.push(s));
    });
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

    customCreepCheck();
    var Role = _.get(room.memory, ['TYPE'])
    console.log(Role,'guck')
    spawns[0].createCustomCreep(Role, room);
}

module.exports = spawning;
// Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], null,{role: 'harvester'}); Beispiel für manuell

 // if (harvesterCheck()) {
    //     spawns[0].createCustomCreep('harvester',room);
    // }
    // else if (truckerCheck()) {
    //     spawns[0].createCustomCreep('trucker',room);
    // }
    // else if (haulerCheck()) {
    //     spawns[0].createCustomCreep('hauler',room);
    // }
    // else if (upgraderCheck()) {
    //     spawns[0].createCustomCreep('upgrader',room);
    // }
    // else if (repairerCheck()) {
    //     spawns[0].createCustomCreep('repairer',room);
    // }
    // else if (builderCheck()) {
    //     spawns[0].createCustomCreep('builder',room);
    // }
    // else if (wallBoyCheck()) {
    //     spawns[0].createCustomCreep('wallboy',room);
    // }
    // else if (sattackerCheck()) {
    //     spawns[0].createCustomCreep('sattacker',room);
    // }
    // else if (lattackerCheck()) {
    //     spawns[0].createCustomCreep('lattacker',room);
    // }
    // else if (healerCheck()) {
    //     spawns[0].createCustomCreep('healer',room);
    // }
