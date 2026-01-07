//Standard function getting the coordinates around a source of energy. Gives it along to the next two functions in line.
function getNearbyPositions(source,room) {
    var positions = [];
    let startX = source.x - 1 || 1;
    let startY = source.y - 1 || 1;
    for (let x = startX; x <=  source.x + 1 && x < 49; x++) {  //holy fuck, there was a typo
        for (let y = startY; y <=  source.y + 1 && y < 49; y++) { //fuck my life, I had to draw it.
            if (x !== source.x || y !== source.y) {
                positions.push(new RoomPosition(x, y, room));
            }
        }
    }
    return positions;
};

//Find all positions at the energy source that are walkable and free of other creeps
function getOpenPositions(source,room) {
    let nearbyPositions = getNearbyPositions(source,room);
    let terrain = Game.map.getRoomTerrain(room);
    let walkablePositions = _.filter(nearbyPositions, function (pos) {
        return terrain.get(pos.x, pos.y) !== TERRAIN_MASK_WALL;
    });
    let freePositions = _.filter(walkablePositions, function (pos) {
        return !pos.lookFor(LOOK_CREEPS).length;
    });
    return freePositions;
};

//To calculate the amount of max harevesters possible per available spot plus one
function getWalkablePositions(source,room) {
    let nearbyPositions = getNearbyPositions(source,room);
    let terrain = Game.map.getRoomTerrain(room);
    let walkablePositions = _.filter(nearbyPositions, function (pos) {
        return terrain.get(pos.x, pos.y) !== TERRAIN_MASK_WALL;
    });
    return walkablePositions.length;
};

module.exports = {
    getNearbyPositions,
    getOpenPositions,
    getWalkablePositions
};