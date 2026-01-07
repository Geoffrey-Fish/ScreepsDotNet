var rolePowerDude = {

    /** @param {Creep} creep **/

    run: function (creep) {
//what the fuck is this shit, past fishi?
        let list = creep.powerDistro();

        let towers = (list[0]) ? false : true;

        let contis = (list[1]) ? false: true;

        let exis = (list[2]) ? false : true;

        let links = (list[3]) ? false : true;

        let spawns = (list[4]) ? false : true;

        let storage = (list[5]) ? false : true;




    }
};

module.exports = rolePowerDude;
