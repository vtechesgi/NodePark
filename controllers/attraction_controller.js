'use strict';

const models = require('../models');
const Attraction = models.attraction;

class Attraction_controller {
    constructor() {
        this.attractions = [];
        this.accumulator = 0;
    }

    addAttraction(name, description, image, type, capacity, duration, from, to, disabled, adults) {
        const att = new Attraction(this.accumulator, name, description, image, type, capacity, duration, from, to, disabled, adults);
        this.attractions.push(att);
        this.accumulator++;
    }

    getAll() {
        return this.attractions;
    }
}

module.exports = new Attraction_controller();