var roomsDefense = require('rooms.defense');
var roomsSpawning = require('rooms.spawning');
var customCreepCheck = require('rooms.customCreepCheck');


function roomsHub() { //hier ist handarbeit doch einfacher,
    //dann muss der nicht jeden tick die ganze welt abchecken oder =
    _.forEach(Game.rooms, function (room) {
        if (room && room.controller && room.controller.my) {
            roomsSpawning(room);
            roomsDefense(room);
            customCreepCheck(room);

        }
    });
}

module.exports = roomsHub;
