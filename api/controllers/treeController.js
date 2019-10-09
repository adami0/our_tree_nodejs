'use strict'
const treeModel = require('./../models/treeModel')

//get user by id
const getTreesByUserId = (req, res) => {
    console.log('checkModel');
    treeModel.getTreesByUserId(response => {
        res.status(200).send(response)
    }, req.params.id);
};

//insert new tree in db
const createTree = (req, res) => {
    treeModel.createTree(response => {
        res.status(201).send(response);
    }, req.body);
}

//updating tree in db
const updateTree = (req, res) => {
    treeModel.updateTree(response => {
        res.status(200).send(response);
    }, req.body);
}

module.exports = {
    getTreesByUserId,
    createTree,
    updateTree
}