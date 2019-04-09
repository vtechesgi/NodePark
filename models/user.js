'use strict';

class User {
    constructor(id, username, password, age, admin) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.age = age;
        this.admin = admin;
        this.billets = [];
    }
}

module.exports = User;
