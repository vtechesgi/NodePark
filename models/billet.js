'use strict';

class Billet {
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.attractions = [];
    }
}

module.exports = Billet;