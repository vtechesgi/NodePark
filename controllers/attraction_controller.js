'use strict';

const models = require('../models');
const Attraction = models.attraction;
const database = models.Database;

class Attraction_controller {
    constructor() {
        this.attractions = [];
        this.accumulator = 0;
    }

    async addAttraction(name, description, image, type, capacity, duration, from, to, disabled, adults) {
        return await database.connection.execute('INSERT INTO attraction (name, description, image, type, capacity, duration, from, to, disabled, adults, working) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [name, description, image, type, capacity, duration, from, to, disabled, adults, 1]);
        //this.attractions.push(att);
        //this.accumulator++;
    }

    async getAttractionById(id) {
        const result = await database.connection.query('SELECT * FROM attraction WHERE id = ?',[id]);
        const rows = result[0];
        if(result[0].length > 0){
            return new Attraction(rows[0].id, rows[0].name, rows[0].description, rows[0].image,rows[0].type,rows[0].capacity,rows[0].duration,rows[0].from,rows[0].to, rows[0].disabled, rows[0].adults, rows[0].working);
        }
        return undefined;
    }

    async getAllAttraction() {
        const results = await database.connection.query('SELECT * FROM attraction');
        return results[0].map((row) => new Attraction(row.id, row.name, row.description, row.image, row.type, row.capacity, row.duration, row.from, row.to, row.disabled, row.adults, row.working));    }
}

module.exports = new Attraction_controller();
