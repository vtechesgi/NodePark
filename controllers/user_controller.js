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

    canEnter(user, attraction) {
        for(let b in user.billets) {
            if(b.type === attraction.type)
                return true;
        }
        return false;
    }

    switchOff(user, attraction) {
        if(user.admin) {
            if(attraction.working) {
                attraction.working = 0;
                return attraction.name + " mise en maintenance";
            }
            else {
                return attraction.name + " est deja en maintenance";
            }
        }
        return "l'utilisateur n'est pas administrateur";
    }
}

module.exports = new User_controller();
