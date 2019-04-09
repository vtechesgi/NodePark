'use strict';

class RouterBuilder {
    build(app) {
        app.use('/user', require('./user_route'));
        app.use('/billet', require('./billet_route'));
    }
}

module.exports = new RouterBuilder();
