'use strict';

const models = require('../models');
const Billet = models.Billet;
const User = models.User;
const badgage_controller = require('./badgage_controller');
const database = models.Database;

class User_controller {
    constructor() {
        this.users = [];
        this.billets = [];
        this.billet_accumulator = 0;
    }

     async addUser(username, password, age, admin) {
        //const u = new User(this.accumulator, username, password, age, admin);
        //this.users.push(u);
        return await database.connection.execute('INSERT INTO users (username, password, age, admin) VALUES (?,?,?,?)', [username, password, age, admin]);
    }

    async getUser(id) {
        const result = await database.connection.query('SELECT * FROM users WHERE id = ?',[id]);
        const rows = result[0];
        if(result[0].length > 0){
            return new User(rows[0].id, rows[0].username, rows[0].password, rows[0].age ,rows[0].admin);
        }
        return undefined;
    }

     async getAllUser() {
        const results = await database.connection.query('SELECT id, username, password, age, admin FROM users');
        return results[0].map((row) => new User(row.id, row.username, row.password, row.age, row.admin));
    }

    async getBilletsByUser(i) {
        return this.users.find((ev) => ev.id === i).billets;
    }

    async addBillet(type, user) {
        const b = new Billet(this.billet_accumulator, type);
        this.billet_accumulator++;
        user.billets.push(b);
    }

    static canEnter(user, attraction) {
        for(let b in user.billets) {
            if(b.type === attraction.type)
                return true;
        }
        return false;
    }

    enter(user, attraction) {
        if(User_controller.canEnter(user, attraction)) {
            badgage_controller.addBadgage(attraction);
            return "badgage enregistré";
        }
        else {
            return user.name + " n'a pas la permission d'entrer dans " + attraction.name;
        }
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
