'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const controller = require('../controllers');
const user_controller = controller.BilletController;

router.use(bodyParser.json());

router.get('/', async(req, res) => {
    res.json(user_controller.getAllUser());
});

router.post('/', async (req, res) => {
    if(!req.body.type) {
        return res.status(400).end();
    }
    user_controller.addBillet(req.body.type);
    res.status(201).end();
});


module.exports = router;
