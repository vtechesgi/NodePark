'use strict';

const models = require('../models');
const Attraction = models.Attraction;
const database = models.Database;

class Attraction_controller {
    constructor() {
        this.attractions = [];
        this.accumulator = 0;
    }

    async addAttraction(name, description, image, type, capacity, duration, dateFrom, dateTo, disabled, adults) {
        return await database.connection.execute('INSERT INTO attraction (name, description, image, type, capacity, duration, dateFrom, dateTo, disabled, adults, working, entries) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [name, description, image, type, capacity, duration, dateFrom, dateTo, disabled, adults, 1, 0]);
    }

    async getAttractionById(id) {
        const result = await database.connection.query('SELECT * FROM attraction WHERE id = ?',[id]);
        const rows = result[0];
        if(result[0].length > 0){
            return new Attraction(rows[0].id, rows[0].name, rows[0].description, rows[0].image,rows[0].type,rows[0].capacity,rows[0].duration,rows[0].dateFrom,rows[0].dateTo, rows[0].disabled, rows[0].adults, rows[0].working, rows[0].entries);
        }
        return undefined;
    }

    async getAllAttraction() {
        const results = await database.connection.query('SELECT id, name, description, image, type, capacity, duration, dateFrom, dateTo, disabled, adults, working, entries FROM attraction');
        return results[0].map((row) => new Attraction(row.id, row.name, row.description, row.image, row.type, row.capacity, row.duration, row.dateFrom, row.dateTo, row.disabled, row.adults, row.working, row.entries));
    }

    async updateAttraction(id, name, description, image, type, capacity, duration, dateFrom, dateTo, disabled, adults, working) {
        const attraction = this.getAttractionById(id);
        if(attraction === undefined) {
            return false;
        }
        const results = await database.connection.execute('UPDATE attraction SET name = ?, description = ?, image = ?, type = ?, capacity = ?, duration = ?, dateFrom = ?, dateTo = ?, disabled = ?, adults = ?, working = ?', [name, description, image, type, capacity, duration, dateFrom, dateTo, disabled, adults, working]);
        if(results === undefined) {
            return false;
        }
        return true;
    }

    async deleteAttraction(id) {
        const attraction = this.getAttractionById(id);
        if(attraction === undefined) {
            return false;
        }
        const results = await database.connection.execute('DELETE FROM attraction WHERE id = ?', [id]);
        if(results === undefined) {
            return false;
        }
        return true;
    }
}

module.exports = new Attraction_controller();
