'use strict'
const memberModel = require('./../models/memberModel');

const getMemberById = (req, res) => {
    memberModel.getMemberById(response => {
        res.status(200).send(response);
    }, req.params.id)
}

const getAllMembersByTreeId = (req, res) => {
    memberModel.getAllMembersByTreeId(response => {
        res.status(200).send(response);
    }, req.params.tree_id)
}

const createMember = (req, res) => {
    memberModel.createMember(response => {
        res.status(201).send(response);
    }, req.body)
}

const getMemberByFirstnameAndLastname = (req, res) => {
    memberModel.getMemberByFirstnameAndLastname(response => {
        res.status(200).send(response);
    }, req.body)
}

module.exports = {
    getMemberById,
    getAllMembersByTreeId,
    createMember,
    getMemberByFirstnameAndLastname
}