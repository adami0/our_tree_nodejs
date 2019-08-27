'use strict'
const treeModel = require('./../models/treeModel')

//get user by id
const getTreesByUserId = (req, res) => {
    treeModel.getTreesByUserId(response => {
        res.status(200).send(response)
    }, req.params.id);
};

module.exports = {
    getTreesByUserId
}