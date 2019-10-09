'use strict'
const relationshipModel = require('./../models/relationshipModel');

const getRelationshipsByTreeId = (req, res) => {
    relationshipModel.getRelationshipsByTreeId(response => {
        res.status(200).send(response)
    }, req.params.tree_id);
}

const createRelationship = (req, res) => {
    relationshipModel.createRelationship(response => {
        res.status(201).send(response)
    }, req.body);
}

module.exports = {
    getRelationshipsByTreeId,
    createRelationship
}