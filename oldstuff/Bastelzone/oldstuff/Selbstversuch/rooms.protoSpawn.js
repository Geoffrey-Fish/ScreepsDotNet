StructureSpawn.prototype.juiceUp = function juiceUp() {

    var sattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'sattacker');
    var oldsat = _.filter(sattackers, (creep) => creep.ticksToLive < 500);
    if (oldsat) {
        oldsat.sort((a, b) => a.ticksToLive - b.ticksToLive);
        console.log('juiceing sattacker');
        return this.renewCreep(oldsat[0]);
    }

    var lattackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'lattacker');
    var oldlat = _.filter(lattackers, (creep) => creep.ticksToLive < 500);
    if (oldlat) {
        oldlat.sort((a, b) => a.ticksToLive - b.ticksToLive);
        console.log('juiceing lattacker');

        return this.renewCreep(oldlat[0]);
    }

    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    var oldheal = _.filter(healers, (creep) => creep.ticksToLive < 500);
    if (oldheal) {
        oldheal.sort((a, b) => a.ticksToLive - b.ticksToLive);
        console.log('juiceing healer');

        return this.renewCreep(oldheal[0]);
    }
}
