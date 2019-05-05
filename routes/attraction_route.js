'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const controller = require('../controllers');
const attraction_controller = controller.AttractionController;

router.use(bodyParser.json());

router.get('/', async (req, res) => {
    res.json(attraction_controller.getAllAttraction());
});

router.post('/', async (req, res) => {
    if(!req.body.name || !req.body.description || !req.body.image || !req.body.type || !req.body.capacity || !req.body.duration || !req.body.from || !req.body.to || !req.body.disabled || !req.body.adults){
        return res.status(400).end();
    }
    attraction_controller.addAttraction(req.body.name, req.body.description, req.body.image, req.body.type, req.body.capacity, req.body.duration, req.body.from, req.body.to, req.body.disabled, req.body.adults);
    res.status(201).end();
});

module.exports = router;
