//Function to calculate how big the baddies may get
function getBody(segment, room) {
    let body = [];
    let segmentCost = _.sum(segment, s => BODYPART_COST[s]);
    let energyAvailable = room.energyAvailable;
    let maxSegments = Math.floor(energyAvailable / segmentCost);
    _.times(maxSegments, () => {
        _.forEach(segment, s => body.push(s));
    });
    return body;
}

//Execution logic that sends the building details to the spawner
function spawnCreep(spawn, roleName, body, room) {
    let number = _.get(room.memory, ['counter']);
    let newName = roleAbbreviation(roleName) + number;
    let result = spawn.spawnCreep(body, newName, { memory: { role: roleName, home: room } });
    if (result == OK) {
        number++;
        _.set(room.memory, ['counter'], number);
    }
    return result;
}

//Just a simple name setter for the naming of the new creeps
function roleAbbreviation(roleName) {
    // Map role names to their abbreviations
    const roleMap = {
        'harvester': 'Harvy',
        'hauler': 'Hauly',
        'upgrader': 'Uppy',
        'builder': 'Bob',
        'repairer': 'Repo',
        'streetbuilder': 'streeter',
        'startbot':'starter'
    };
    return roleMap[roleName] || roleName;
}

//MAIN FUNCTION: This is called from the hub. A constant stream of new creeps
function spawning(room,code) {
    //New room or all dead
    if(code == 0){
        let spawns = room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_SPAWN }
        });
    
        spawns = _.filter(spawns, function (structure) {
            return !structure.spawning
        })
        if (!spawns.length) {
            return;
        }
        spawnCreep(spawns[0],'startbot',[WORK,MOVE],{memory: {role: 'startbot',home:'room'}});
        console.log('Startbot Protocol initiated!');
    }
    //usual business behaviour
    else if(code == 1){
        let spawns = room.memory.immobilia.spawnlist;
        if (!spawns || spawns.length === 0) {
            return;
        }
        let spawn = Game.getObjectById(spawns[0]);
    
        if (!spawn || typeof spawn.spawnCreep !== 'function') {
            console.log('Error: Invalid spawn object or spawnCreep method not available.');
            return;
        }
        let type = room.memory.TYPE || 'harvester';
        let body;
        switch (type) {
            case 'harvester':
                body = getBody([WORK, MOVE], room);
                break;
            case 'hauler':
                body = getBody([CARRY, MOVE], room);
                break;
            case 'upgrader':
                body = getBody([WORK, CARRY, MOVE], room);
                break;
            case 'builder':
                body = getBody([WORK, CARRY, MOVE], room);
                break;
            case 'repairer':
                body = getBody([WORK, CARRY, MOVE], room);
                break;
                case 'streetbuilder':
                    body = getBody([WORK,CARRY,MOVE],room);
                    break;
                case 'wallboy':
                    body = getBody([WORK,CARRY,MOVE],room);
                    break;
            default:
                return;
        }
        //Now call the building process
        spawnCreep(spawn, type, body, room);
    }
}
module.exports = spawning;
