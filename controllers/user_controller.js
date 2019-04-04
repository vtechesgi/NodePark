'use strict';

const models = require('../models');
const Billet = models.Billet;
const User = models.User;

class User_controller {
    constructor() {
        this.users = [];
        this.accumulator = 0;
        this.billets = [];
    }

    addUser(username, password, age, admin) {
        const u = new User(this.accumulator, username, password, age, admin);
        this.users.push(u);
        this.accumulator++;
    }

    getUser(id) {
        return this.users.findById(id);
    }

    getBillet(ticket_id, type) {
        const b = new Billet(ticket_id, type);
        this.users.billets.push(b);
    }
}

module.exports = new User_controller();