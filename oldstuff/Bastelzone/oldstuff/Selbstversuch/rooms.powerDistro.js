Creep.prototype.powerDistro = function powerDistro() {  //TODO dont loop it all the time?
//IDEA:: Better use a memory list of towers here
    let towers = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_TOWER);
        }
    });
    if (towers) {
        let powerTowers = [];
        _.forEach(towers, function (tower) {
            let power = tower.store[RESOURCE_ENERGY]
            powerTowers.push({ tower: power })
        }) //CAP 1000
        let towersSum = _.sum(powerTowers,'tower');
        let towersCount = powerTowers.length;
        let towersMid = towersSum / towersCount;
        let towersTotal = towersCount * 1000;
        let towers50 = towersTotal / 2;
        let towerNeed = (towersMid < towers50)? true:false ;
        console.log(towersMid, 'towersmid');
    }

//IDEA:: Better use a memory list of Containers here!
    let contis = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_CONTAINER);
        }
    });
    if (contis) {
        let powerContis = [];
        _.forEach(contis, function (conti) {
            let power = conti.store[RESOURCE_ENERGY]
            powerContis.push({ conti: power })
        }) //CAP 2000
        let contisSum = _.sum(powerContis,'conti');
        let contisCount = powerContis.length;
        let contisMid = contisSum / contisCount;
        let contisTotal = contisCount * 2000;
        let contis50 = contisTotal / 2;
        let contisNeed = (contisMid < contis50)? true:false;
        console.log(contisMid, 'contismid');
    }
    //IDEA:: Same here!
    let exis = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_EXTENSION);
        }
    });
    if (exis) {
        let powerExis = [];
        _.forEach(exis, function (exi) {
            let power = exi.store[RESOURCE_ENERGY]
            powerExis.push({ exi: power })
        }) //CAP 50
        let exisSum = _.sum(powerExis,'exi');
        let exisCount = powerExis.length;
        let exisMid = exisSum / exisCount;
        let exisTotal = exisCount * 50;
        let exis50 = exisTotal / 2;
        let exisNeed = (exisMid < exis50)? true:false;
        console.log(exisMid, 'exismid');
    }
  //IDEA:: Same here!
    let links = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_LINK);
        }
    });
    if (links) {
        let powerLinks = [];
        _.forEach(links, function (link) {
            power = link.store[RESOURCE_ENERGY]
            powerLinks.push({ link: power })
        }) //CAP 800
        let linksSum = _.sum(powerLinks,'link');
        let linksCount = powerLinks.length;
        let linksMid = linksSum / linksCount;
        let linksTotal = linksCount * 800;
        let links50 = linksTotal / 2;
        let linksNeed = (linksMid < links50)? true: false;
        console.log(linksMid, 'linksmid');
    }
  //IDEA:: Same here!
    let spawns = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_SPAWN);
        }
    });
    if (spawns) {
        let powerSpawns = [];
        _.forEach(spawns, function (spawn) {
            power = spawn.store[RESOURCE_ENERGY]
            powerSpawns.push({ spawn: power })
        }) //CAP 300
        let spawnsSum = _.sum(powerSpawns,'spawn');
        let spawnsCount = powerSpawns.length;
        let spawnsMid = spawnsSum / spawnsCount;
        let spawnsTotal = spawnsCount * 300;
        let spawns50 = spawnsTotal / 2;
        let spawnsNeed = (spawnsMid < spawns50)? true: false;
        console.log(spawnsMid, 'spawnsmid');
    }
  //IDEA:: Same here!
    let storage = this.room.find(FIND_STRUCTURES, {
        filter: (struct) => {
            return (struct.structureType == STRUCTURE_STORAGE);
        }
    });
    let storag = (storage) ? true : false;

  //IDEA:: Same here!
     let list = [towerNeed, contisNeed, exisNeed, linksNeed, spawnsNeed, storag];//storag only for you know

    return list;

}
