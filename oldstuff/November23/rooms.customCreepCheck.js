//This function is on the lookout what creeps are active, if the correct amounts are met by the requirements and so on.
function customCreepCheck(room) {
    if(!room.memory.TYPE){
        room.memory.TYPE = {};
        return;
    };
    if (!room.memory.census) {
        room.memory.census = {
            'harvester': 4,
            'hauler': 2,
            'upgrader': 2,
            'builder': 2,
            'repairer': 1,
            'streetbuilder':2,
            'wallboy':1
        };
        return;
    };

    // How many are supposed to be in the room. Looks in the census list under the name. if nothing found, uses the fallback number at the end
    var harvesterTarget = _.get(room.memory, ['census', 'harvester'], 1);
    var haulerTarget = _.get(room.memory, ['census', 'hauler'], 1);
    var upgraderTarget = _.get(room.memory, ['census', 'upgrader'], 1);
    var builderTarget = _.get(room.memory, ['census', 'builder'], 1);
    var repairerTarget = _.get(room.memory, ['census', 'repairer'], 1);
    var streetbuilderTarget = _.get(room.memory,['census','streetbuilder'],1)
    var wallboyTarget = _.get(room.memory,['census','wallboy'],1 );

    
    // No check how many actually are there
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' );
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var streetbuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'streetbuilder');
    var wallboys = _.filter(Game.creeps,(creep)=> creep.memory.role == 'wallboy');
    //If a new start or worse happened, make sure you have at least a simple miner and hauler active.
    if (!harvesters.length){
        _.set(room.memory,['TYPE'], 'harvester');
    };
    if (harvesters.length == 1 && !haulers.length)  {
        _.set(room.memory, ['TYPE'], 'hauler');
    };
// If minimum workers are set(see above), go to usual business
    if (harvesters.length < harvesterTarget) {
        _.set(room.memory, ['TYPE'], 'harvester');
    }
    else if (haulers.length < haulerTarget) {
        _.set(room.memory, ['TYPE'], 'hauler');
    }
    else if (streetbuilders.length < streetbuilderTarget){
        _.set(room.memory, ['TYPE'],'streetbuilder');
    }
    else if (upgraders.length < upgraderTarget) {
        _.set(room.memory, ['TYPE'], 'upgrader');
    }
    else if (builders.length < builderTarget) {
        _.set(room.memory, ['TYPE'], 'builder');
    }
    else if (repairers.length < repairerTarget) {
        _.set(room.memory, ['TYPE'], 'repairer');
    }
    else if(wallboys.length < wallboyTarget){
        _.set(room.memory,['TYPE'],'wallboy');
    }
    else {
        _.set(room.memory, ['TYPE'], 'FULL');
    }
};

module.exports = customCreepCheck;
