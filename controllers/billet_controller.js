'use strict';

const models = require('../models');
const Billet = models.Billet;
const Attraction = models.Attraction;

class Billet_controller {
    constructor() {
        this.billets = [];
        this.accumulator = 0;
    }

    async addBillet(type) {
        const b = new Billet(this.accumulator, type);
        this.billets.push(b);
        this.accumulator++;
    }

    async addAttraction(Attraction) {
        this.billets.attractions.push(Attraction);
    }
}

module.exports = new Billet_controller();
