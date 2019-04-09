'use strict';

class Attraction {
    constructor(id, name, description, image, type, capacity, duration, from, to, disabled, adults, working) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.type = type;
        this.capacity = capacity;
        this.duration = duration;
        this.from = from;
        this.to = to;
        this.disabled = disabled;
        this.adults = adults;
        this.working = working;
    }

}

module.exports = Attraction;

