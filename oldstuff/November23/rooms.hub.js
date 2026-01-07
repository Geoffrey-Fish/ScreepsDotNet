var roomsSpawning = require('rooms.spawning');
var customCreepCheck = require('rooms.customCreepCheck');
var defense = require('rooms.defense');
var showNames = require('rooms.test');


function roomsHub() {
    _.forEach(Game.rooms, function (room) {
        //Is it my room?
        if (room && room.controller && room.controller.my) {
            if (!room.memory.immobilia) {
                //After all that, a special call for starter bot with the '0'
                roomsSpawning(room, 0);
            }
            else {
                defense(room);
                customCreepCheck(room);
                roomsSpawning(room, 1);
                showNames(rrom);
            }
        }
    });
}

module.exports = roomsHub;  

    //SŰPER Usefull for old shit in the bucket
/*   // Get the active room name
const activeRoomName = Game.spawns['Spawn1'].room.name;

  // Iterate through the rooms in memory and remove the inactive ones
for (const roomName in Memory.rooms) {
    if (roomName !== activeRoomName) {
        console.log(`Deleting memory for inactive room: ${roomName}`);
        delete Memory.rooms[roomName];
    }
  } */
  if(Memory.rooms['W3N41'].length == 0){
    delete Memory.rooms['W3N41'];
  }