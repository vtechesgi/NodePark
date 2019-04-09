'use strict';

const models = require('../models');
const Billet = models.Billet;
const User = models.User;

class User_controller {
    constructor() {
        this.users = [];
        this.accumulator = 0;
        this.billets = [];
        this.billet_accumulator = 0;
    }

    addUser(username, password, age, admin) {
        const u = new User(this.accumulator, username, password, age, admin);
        this.users.push(u);
        this.accumulator++;
    }

    getUser(i) {
        return this.users.find((ev) => ev.id === i);
    }

    getAllUser() {
        return this.users;
    }

    getBilletsByUser(i) {
        return this.users.find((ev) => ev.id === i).billets;
    }

    addBillet(type, user) {
        const b = new Billet(this.billet_accumulator, type);
        this.billet_accumulator++;
        user.billets.push(b);
    }
}

module.exports = new User_controller();
