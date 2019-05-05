'use strict';

const models = require('../models');
const Attraction = models.Attraction;
const User = models.User;
const Billet = models.Billet;
const database = models.Database;
const attractionController = require('./attraction_controller');

class Badgage_controller {

    async addBadgage(id_attraction) {
        try {
            const attraction = await attractionController.getAttractionById(id_attraction);
            if(attraction === undefined) {
                console.log("results est undefined");
                return false;
            }
        } catch (e) {
            console.log(e);
        }
        const results = await database.connection.execute('UPDATE attraction SET entries = entries+1 WHERE id = ?', [id_attraction]);
        if(results === undefined) {
            console.log("results est undefined");
            return false;
        }
        return true;
    }

    async getMonthByAttraction() {
        const attractions_result = await attractionController.getAllAttraction();
        const results = [];

        attractions_result.forEach(function (element) {
            function getMonthFromToToday(from) {
                let time_diff = Date.now()/1000 - from;
                return Math.ceil(time_diff / (24 * 3600 * 30));
            }
            let by_month = element.entries / getMonthFromToToday(element.dateFrom);
            results.push({
                AttractionName: element.name,
                NbrEntreesParMois: by_month
            });
        });
        return results;
    }

    async getDayByAttraction() {
        const attractions_result = await attractionController.getAllAttraction();
        const results = [];

        attractions_result.forEach(function (element) {
            function getDayFromToToday(from) {
                let time_diff = Date.now() - from;
                return Math.ceil(time_diff / (24 * 3600));
            }
            let by_day = element.entries / getDayFromToToday(element.dateFrom);
            results.push({
                AttractionName: element.name,
                NbrEntreesParJour: by_day
            });
        });
        console.log(results);
        return results;
    }

    async getAllStats() {
        const final_results = [];
        final_results.push(await this.getDayByAttraction());
        final_results.push(await this.getMonthByAttraction());
        return final_results;
    }

}

module.exports = new Badgage_controller();
