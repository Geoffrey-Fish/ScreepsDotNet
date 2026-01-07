var roomsDefense = require('rooms.defense');
var roomsSpawning = require('rooms.spawning');
var customCreepCheck = require('rooms.customCreepCheck');
var posfunctions = require('rooms.posfunctions');


function roomsHub() {

    _.forEach(Game.rooms, function (room) {

        if (room && room.controller && room.controller.my) {
            //TESTRAUM

            //TESTRAUM
            roomsDefense(room);
            customCreepCheck(room);
            let maxCap = room.energyCapacityAvailable;
            let halfCap = maxCap / 2;
            roomsSpawning(room);
            // if (room.energyAvailable >= halfCap && room.energyAvailable >= 300) {
            //     roomsSpawning(room);
            // }
        }
    });
}

module.exports = roomsHub;
