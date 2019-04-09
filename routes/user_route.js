'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const controller = require('../controllers');
const user_controller = controller.UserController;

router.use(bodyParser.json());

router.get('/', async(req, res) => {
    res.json(user_controller.getAllUser());
});

router.get('/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    if(user_controller.getUser(id) === undefined) {
        return res.status(404).end();
    }
    res.json(user_controller.getUser(id));
    res.status(200).end();
});

router.get('/:id/billet', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    if(user_controller.getUser(id) === undefined) {
        return res.status(404).end();
    }
    res.json(user_controller.getBilletsByUser(id));
    res.status(200).end();
});

router.post('/', async (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.age || !req.body.admin) {
        return res.status(400).end();
    }
    user_controller.addUser(req.body.username, req.body.password, req.body.age, req.body.admin);
    res.status(201).end();
});

router.post('/billet', async (req, res) => {
    if(!req.body.id || !req.body.type) {
        return res.status(400).end();
    }
    const user = user_controller.getUser(req.body.id);
    user_controller.addBillet(req.body.type, user);
    res.status(201).end();
});

module.exports = router;
