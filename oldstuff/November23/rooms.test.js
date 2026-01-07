function showNames(room){
    if(!room.memory.test){
        room.memory.test = false;
    }
    if (room.memory.test){
        let counter = 0;
        _.forEach(Game.creeps, (creep) => creep.say('Ola, Babo!'));
        _.forEach(Game.creeps, (creep) => {if(creep.my){ counter++;}});
        console.log('Number of Creeps is: ' + counter);
        console.log(room.energyAvailable);
        room.memory.test = false;
    }
} 

module.exports = showNames;

//Memory.rooms.W3N41.test= true;
//console.log(Memory.rooms.W3N41.test);