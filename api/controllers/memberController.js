'use strict'
const memberModel = require('./../models/memberModel');

//reserved to admin
const getNbOfMembers = (req, res) => {
    if (res.error === false) {
        memberModel.getNbOfMembers(response => {
            if (response.error === false) {
                res.status(200).send(response);
            } else {
                res.status(403).send(response);
            }
        }, req.body);
    } else {
        res.status(403).send(response);
    }
}

const getMemberById = (req, res) => {
    memberModel.getMemberById(response => {
        res.status(200).send(response);
    }, req.params.id)
}

//here we get members and relationship types between them
const getAllMembersByTreeId = (req, res) => {
    if (res.error === false) {
        memberModel.getAllMembersByTreeId(response => {
            res.status(200).send(response);
        }, req.body);
    } else {
        res.error = true;
        res.status(403).send(response);
    }
}

const createMember = (req, res) => {
    memberModel.createMember(response => {
        res.status(201).send(response);
    }, req.body)
}

const updateMember = (req, res) => {
    if (res.error === false) {
        memberModel.updateMember(response => {
            res.status(200).send(response);
        }, req.body);
    } else {
        res.error = true;
        res.status(403).send(response);
    }
}

const deleteMember = (req, res) => {
    memberModel.deleteMember(response => {
        res.status(201).send(response);
    }, req.body)
}

const getMemberByFirstnameAndLastname = (req, res) => {
    memberModel.getMemberByFirstnameAndLastname(response => {
        res.status(200).send(response);
    }, req.body)
}



module.exports = {
    getNbOfMembers,
    deleteMember,
    getMemberById,
    getAllMembersByTreeId,
    createMember,
    getMemberByFirstnameAndLastname,
    updateMember
}