Creep.prototype.powerDistro = function powerDistro() {  //TODO dont loop it all the time?

    var towers = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_TOWER);
        }
    });
    if (towers) {
        var powerTowers = [];
        _.forEach(towers, function (tower) {
            let power = tower.store[RESOURCE_ENERGY]
            powerTowers.push({ tower: power })
        }) //CAP 1000
    }

    var contis = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_CONTAINER);
        }
    });
    if (contis) {
        var powerContis = [];
        _.forEach(contis, function (conti) {
            let power = conti.store[RESOURCE_ENERGY]
            powerContis.push({ conti: power })
        }) //CAP 2000
    }

    var exis = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_EXTENSION);
        }
    });
    if (exis) {
        var powerExis = [];
        _.forEach(exis, function (exi) {
            let power = exi.store[RESOURCE_ENERGY]
            powerExis.push({ exi: power })
        }) //CAP 50
    }

    var links = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_LINK);
        }
    });
    if (links) {
        var powerLinks = [];
        _.forEach(links, function (link) {
            power = link.store[RESOURCE_ENERGY]
            powerLinks.push({ link: power })
        }) //CAP 800
    }

    var spawns = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_SPAWN);
        }
    });
    if (spawns) {
        var powerSpawns = [];
        _.forEach(spawns, function (spawn) {
            power = spawn.store[RESOURCE_ENERGY]
            powerSpawns.push({ spawn: power })
        }) //CAP 300
    }

    var storage = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_STORAGE);
        }
    });
    if (storage) {
        var powerStorage = [];
        _.forEach(storage, function (storag) {
            power = storag.store[RESOURCE_ENERGY]
            powerStorage.push({ storag: power })
        }) //CAP 1Mio
    }


    let towersSum = _.sum(powerTowers,'tower');
    let towersCount = powerTowers.length;
    let towersMid = towersSum / towersCount;
    let towersTotal = towersCount * 1000;
    let towers50 = towersTotal / 2;
    let towerNeed = false;
    console.log(towersMid, 'towersmid');

    let contisSum = _.sum(powerContis,'conti');
    let contisCount = powerContis.length;
    let contisMid = contisSum / contisCount;
    let contisTotal = contisCount * 2000;
    let contis50 = contisTotal / 2;
    let contisNeed = false;
    console.log(contisMid, 'contismid');
    let exisSum = _.sum(powerExis,'exi');
    let exisCount = powerExis.length;
    let exisMid = exisSum / exisCount;
    let exisTotal = exisCount * 50;
    let exis50 = exisTotal / 2;
    let exisNeed = false;
    console.log(exisMid, 'exismid');

    let linksSum = _.sum(powerLinks,'link');
    let linksCount = powerLinks.length;
    let linksMid = linksSum / linksCount;
    let linksTotal = linksCount * 800;
    let links50 = linksTotal / 2;
    let linksNeed = false;
    console.log(linksMid, 'linksmid');

    let spawnsSum = _.sum(powerSpawns,'spawn');
    let spawnsCount = powerSpawns.length;
    let spawnsMid = spawnsSum / spawnsCount;
    let spawnsTotal = spawnsCount * 300;
    let spawns50 = spawnsTotal / 2;
    let spawnsNeed = false;
    console.log(spawnsMid, 'spawnsmid');

    let storageSum = _.sum(powerStorage,'storag'); //Because only one per room,brutal much storage, LOWEST PRIO
    console.log(storageSum, 'storagesum');


    if (towersMid < towers50) {
        towerNeed = true;
    }
    else {
        towerNeed = false;
    }
    if (contisMid < contis50) {
        contisNeed = true;
    }
    else {
        contisNeed = false;
    }
    if (exisMid < exis50) {
        exisNeed = true;
    }
    else {
        exisNeed = false;
    }
    if (linksMid < links50) {
        linksNeed = true;
    }
    else {
        linksNeed = false;
    }
    if (spawnsMid < spawns50) {
        spawnsNeed = true
    }
    else {
        spawnsNeed = false;
    }

    var list = [towerNeed, contisNeed, exisNeed, linksNeed, spawnsNeed];

    return list;

}
