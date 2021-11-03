'use strict';

const express = require('express');
const clothesRouter = express.Router();


const {clothesCollection} = require('../models/index');

clothesRouter.get('/clothes',getClothes);
clothesRouter.post('/clothes',createClothes);
clothesRouter.get('/clothes/:id', getOneClothes)
clothesRouter.put('/clothes/:id', updateClothes);
clothesRouter.delete('/clothes/:id', deleteClothes)



async function getClothes(req,res) {
    let clothes = await clothesCollection.read();
    res.status(200).json(clothes);
}

async function createClothes(req,res) {
    let obj = req.body;
    let clothes = await clothesCollection.create(obj);
    res.status(201).json(clothes);
}

async function getOneClothes(req,res) {
    const id = parseInt(req.params.id);
    let clothes = await clothesCollection.read(id)
    res.status(201).json(clothes);
}

async function updateClothes(req,res){
    const id = parseInt(req.params.id);
    const obj = req.body;
let clothes = await clothesCollection.read(id);
let updatedClothes = await clothes.update(obj);
    res.status(204).json(updatedClothes);
}
async function deleteClothes(req, res) {
    const id = parseInt(req.params.id);
    const deletedClothes = await clothesCollection.delete(id);
    res.status(204).json(deletedClothes);

}





module.exports= clothesRouter;