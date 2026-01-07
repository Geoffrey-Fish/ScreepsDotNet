function customCreepCheck(room) {

    // How many are supposed to be in the room
    var harvesterTarget = _.get(room.memory, ['census', 'harvester'], 1);
    var truckerTarget = _.get(room.memory, ['census', 'trucker'], 1);
    var haulerTarget = _.get(room.memory, ['census', 'hauler'], 1);
    var upgraderTarget = _.get(room.memory, ['census', 'upgrader'], 1);
    var builderTarget = _.get(room.memory, ['census', 'builder'], 1);
    var repairerTarget = _.get(room.memory, ['census', 'repairer'], 1);
    var wallboyTarget = _.get(room.memory, ['census', 'wallBoy'], 1);
    var powerdudeTarget = _.get(room.memory, ['census', 'powerdude'], 1);
    var healerTarget = _.get(room.memory, ['census', 'healer'], 1);
    var sattackerTarget = _.get(room.memory, ['census', 'sattacker'], 1);
    var lattackerTarget = _.get(room.memory, ['census', 'lattacker'], 1);

    // How many actually are there
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var truckers = _.filter(Game.creeps, (creep) => creep.memory.role == 'trucker');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' );
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var wallboys = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallboy');
    var powerdudes = _.filter(Game.creeps, (creep) => creep.memory.role == 'powerdude');
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    var sattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'sattacker');
    var lattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'lattacker');


    console.log(harvesters.length, 'harvys of ', harvesterTarget);
    console.log(haulers.length, 'haulers of ', haulerTarget);
    console.log(repairers.length, 'reppers of ', repairerTarget);
    console.log(builders.length,'builders of ',builderTarget);
    console.log(upgraders.length, 'uppers of ', upgraderTarget);
    console.log(truckers.length, 'truckers of ', truckerTarget);
    console.log(wallboys.length, 'wallboys of ', wallboyTarget);
    console.log(powerdudes.length, ' powers of ', powerdudeTarget);
    console.log(healers.length, 'healers of ', healerTarget);
    console.log(sattackers.length, 'sattackers of ', sattackerTarget);
    console.log(lattackers.length, 'lattackers of ', lattackerTarget);
    console.log(room.memory['TYPE'],'NOW BUILDING')

    // Now calculate it, maybe switches?
    let ALARM = _.get(room.memory, ['Alert']);
    if (ALARM) {
        if (sattackers.length < sattackerTarget) {
            _.set(room.memory, ['TYPE'], 'sattacker');
        }
        else if (lattackers.length < lattackerTarget) {
            _.set(room.memory, ['TYPE'], 'lattacker');
        }
        else if (healers.length < healerTarget) {
            _.set(room.memory, ['TYPE'], 'healer');
        }
    }
    else {
        if (harvesters.length < harvesterTarget) {
            _.set(room.memory, ['TYPE'], 'harvester');
        }
        else if (haulers.length < haulerTarget) {

            _.set(room.memory, ['TYPE'], 'hauler');
        }
        else if (repairers.length < repairerTarget) {

            _.set(room.memory, ['TYPE'], 'repairer');
        }
        else if (builders.length < builderTarget) {

            _.set(room.memory, ['TYPE'], 'builder');
        }
        else if (upgraders.length < upgraderTarget) {

            _.set(room.memory, ['TYPE'], 'upgrader');
        }
        else if (truckers.length < truckerTarget) {
            _.set(room.memory, ['TYPE'], 'trucker');
        }
        else if (wallboys.length < wallboyTarget) {

            _.set(room.memory, ['TYPE'], 'wallboy');
        }
        else if (powerdudes.length < powerdudeTarget) {
            _.set(room.memory, ['TYPE'], 'powerdude');
        }
        else {
            _.set(room.memory, ['TYPE'], 'FULL');
        }
    }
};

module.exports = customCreepCheck;
