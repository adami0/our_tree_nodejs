'use strict'
const treeModel = require('./../models/treeModel')

//get trees by user id
const getTreesByUserId = (req, res) => {
    if (res.error === false) {
        treeModel.getTreesByUserId(response => {
            console.log('response error: ' + response.error);
            console.log('!response error: ' + !response.error);
            res.error = false;
            res.status(200).send(response);
        }, req.params.id)
    } else {
        res.error = true;
        res.status(403).send('invalid token');
    }
};


//insert new tree in db
const createTree = (req, res) => {
    if (res.error === false) {
        treeModel.createTree(response => {
            res.status(201).send(response);
        }, req.body);
    } else {
        res.error = true;
        res.status(403).send('invalid token');
    }
}

//updating tree in db
const updateTree = (req, res) => {
    if (res.error === false) {
        treeModel.updateTree(response => {
            res.status(200).send(response);
        }, req.body)
    } else {
        res.error = true;
        res.status(403).send('invalid token');
    }
}

module.exports = {
    getTreesByUserId,
    createTree,
    updateTree
}