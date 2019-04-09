'use strict';

const models = require('../models');
const Attraction = models.attraction;
const User = models.User;
const Billet = models.Billet;

class Badgage_controller {

    addBadgage(attraction) {
        //@TODO insert INTO attractions
    }

    getDayFromToToday(from) {
        let time_diff = from.getDate() - Date.now();
        return Math.ceil(time_diff / (1000 * 3600 * 24));
    }

    getMonthFromToToday(from) {
        let time_diff = from.getDate() - Date.now();
        return Math.ceil(time_diff / (1000 * 3600 + 24 + 30));
    }
    getMonthByAttraction() {
        const attractions_result = [new Attraction(), new Attraction(), new Attraction()]; //A remplacer par la liste des attractiosn stockees dans la bdd
        const results = [];
        for(let attraction_i in attractions_result) {
            const by_month = attraction_i.entrees / this.getMonthFromToToday(attraction_i.from);
            results.push(by_month);
        }
        return results;
    }

    getDayByAttraction() {
        const attractions_result = [new Attraction(), new Attraction(), new Attraction()]; //A remplacer par la liste des attractiosn stockees dans la bdd
        const results = [];
        for(let attraction_i in attractions_result) {
            const by_day = attraction_i.entrees / this.getDayFromToToday(attraction_i.from);
            results.push(by_day);
        }
        return results;
    }


}

module.exports = new Badgage_controller();
