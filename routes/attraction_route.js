'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const controller = require('../controllers');
const attraction_controller = controller.AttractionController;
const badgage_controller = controller.BadgageController;

router.use(bodyParser.json());

router.get('/', async (req, res) => {
    res.json(await attraction_controller.getAllAttraction());
});

router.get('/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const attractionId = await attraction_controller.getAttractionById(id);
    if(attractionId === undefined) {
        return res.status(404).end();
    }
    res.json(attractionId);
    res.status(200).end();
});

router.post('/', async (req, res) => {
    //if(!req.body.name || !req.body.description || !req.body.image || !req.body.type || !req.body.capacity || !req.body.duration || !req.body.dateFrom || !req.body.to || !req.body.disabled || !req.body.adults){
     //  return res.status(400).end();
    //}
    attraction_controller.addAttraction(req.body.name, req.body.description, req.body.image, req.body.type, req.body.capacity, req.body.duration, req.body.dateFrom, req.body.dateTo, req.body.disabled, req.body.adults);
    res.status(201).end();
});

router.put('/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if(Number.isNaN(id)) {
        return res.status(404).end();
    }
    if(await attraction_controller.updateAttraction(id, req.body.name, req.body.description, req.body.image, req.body.type, req.body.capacity, req.body.duration, req.body.dateFrom, req.body.dateTo, req.body.disabled, req.body.adults, req.body.working)){
        res.status(204).end();
    }
    res.status(404).end();
});

router.delete('/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if(Number.isNaN(id)) {
        return res.status(404).end();
    }
    if(await attraction_controller.deleteAttraction(id)) {
        res.status(204).end();
    }
    res.status(404).end();
});

router.put('/entry/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if(Number.isNaN(id)) {
        return res.status(404).end();
    }
    if(await badgage_controller.addBadgage(id)){
        res.status(204).end();
    }
    res.status(404).end();
});

module.exports = router;
