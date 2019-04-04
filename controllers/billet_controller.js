'use strict';

const models = require('../models');
const Billet = models.billet;
const Attraction = models.attractions;

class Billet_controller {
    constructor() {
        this.billets = [];
        this.accumulator = 0;
    }

    addBillet(type) {
        const b = new Billet(this.accumulator, type);
        this.billets.push(b);
        this.accumulator++;
    }

    addAttraction(Attraction) {
        this.billets.attractions.push(Attraction);
    }
}

module.exports = new Billet_controller();