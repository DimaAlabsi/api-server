'use strict';

const express = require('express');

const FoodRouter = express.Router();

const {foodCollection} = require('../models/index');

FoodRouter.get('/food',getfood);
FoodRouter.post('/food',createfood);

FoodRouter.get('/food/:id', getOnefood)
FoodRouter.put('/food/:id', updatefood);
FoodRouter.delete('/food/:id', deletefood);

async function getfood(req,res) {
    let food = await foodCollection.read();
    res.status(200).json(food);
}

async function createfood(req,res) {
    let obj = req.body;
    let food = await foodCollection.create(obj);
    res.status(201).json(food);
}


async function getOnefood(req,res) {
    const id = parseInt(req.params.id);
    let food = await foodCollection.read(id)
    res.status(201).json(food);
}

async function updatefood(req,res){
    const id = parseInt(req.params.id);
    const obj = req.body;
let food = await foodCollection.read(id);
let updatedfood = await food.update(obj);
    res.status(204).json(updatedfood);
}
async function deletefood(req, res) {
    const id = parseInt(req.params.id);
    const deletedfood = await foodCollection.delete(id);
    res.status(204).json(deletedfood);

}

module.exports = FoodRouter;