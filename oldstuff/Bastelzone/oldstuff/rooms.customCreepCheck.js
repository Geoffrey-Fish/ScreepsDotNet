function customCreepCheck() {
    _.forEach(Game.rooms, function (room) {
        if (room && room.controller && room.controller.my) {

            // How many are supposed to be in the room
            var harvesterTarget = _.get(room.memory, ['census', 'harvester'], 1);
            var truckerTarget = _.get(room.memory, ['census', 'trucker'], 1);
            var haulerTarget = _.get(room.memory, ['census', 'hauler'], 1);
            var upgraderTarget = _.get(room.memory, ['census', 'upgrader'], 1);
            var builderTarget = _.get(room.memory, ['census', 'builder'], 1);
            var repairerTarget = _.get(room.memory, ['census', 'repairer'], 1);
            var wallboyTarget = _.get(room.memory, ['census', 'wallboy'], 1);
            var healerTarget = _.get(room.memory, ['census', 'healer'], 1);
            var sattackerTarget = _.get(room.memory, ['census', 'sattacker'], 1);
            var lattackerTarget = _.get(room.memory, ['census', 'lattacker'], 1);

            // How many actually are there
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');//&& creep.memory.home == room);
            var truckers = _.filter(Game.creeps, (creep) => creep.memory.role == 'trucker');//&& creep.memory.home == room);
            var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');//&& creep.memory.home == room);
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' );//&& creep.memory.home == room);
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');//&& creep.memory.home == room);
            var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');//&& creep.memory.home == room);
            var wallboys = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallboy');//&& creep.memory.home == room);
            var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');//&& creep.memory.home == room);
            var sattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'sattacker');//&& creep.memory.home == room);
            var lattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'lattacker');//&& creep.memory.home == room);


            // Now calculate it, maybe switches?

            if (harvesters.length < harvesterTarget) {
                _.set(room.memory,['TYPE'], 'harvester');
            }
            else if (truckers.length < truckerTarget) {
                _.set(room.memory,['TYPE'], 'trucker');
            }
            else if (haulers.length < haulerTarget) {

                _.set(room.memory,['TYPE'], 'hauler');
            }
            else if (upgraders.length < upgraderTarget) {

                _.set(room.memory,['TYPE'], 'upgrader');
            }
            else if (builders.length < builderTarget) {

                _.set(room.memory,['TYPE'], 'builder');
            }
            else if (repairers.length < repairerTarget) {

                _.set(room.memory,['TYPE'], 'repairer');
            }
            else if (wallboys.length < wallboyTarget) {

                _.set(room.memory,['TYPE'], 'wallboy');
            }
            else if (healers.length < healerTarget) {

                _.set(room.memory,['TYPE'], 'healer');
            }
            else if (sattackers.length < sattackerTarget) {

                _.set(room.memory,['TYPE'], 'sattacker');
            }
            else if (lattacker.length < lattackerTarget) {

                _.set(room.memory,['TYPE'], 'lattacker');
            }
            else {
                return;
            }
        }
    })
};

module.exports = customCreepCheck;
