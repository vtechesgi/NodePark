'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const controller = require('../controllers');
const user_controller = controller.BilletController;
const badgage_controller = controller.BadgageController;

router.use(bodyParser.json());

router.post('/', async (req, res) => {
    if(!req.body.type) {
        return res.status(400).end();
    }
    user_controller.addBillet(req.body.type);
    res.status(201).end();
});

router.get('/stats', async (req, res) => {
    res.json(await badgage_controller.getAllStats());
    res.status(200).end();
});


module.exports = router;
