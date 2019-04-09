'use strict';

class RouterBuilder {
    build(app) {
        app.use('/user', require('./user_route'));
        app.use('/billet', require('./billet_route'));
        app.use('/attraction', require('./attraction_route'));
    }
}

module.exports = new RouterBuilder();
