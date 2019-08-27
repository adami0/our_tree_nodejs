'use strict'
const userModel = require('./../models/userModel')

//get all users
const getUsers = (req, res) => {
    userModel.getUsers(response => {
        res.status(200).send(response)
    })
}

//get user by id
const getUserById = (req, res) => {
    userModel.getUserById(response => {
        res.status(200).send(response)
    }, req.params.id);
};

const register = (req, res) => {
    console.log('yo')
    console.log(req.body);
    userModel.register(response => {
        res.status(200).send(response)
    }, req.body)
}

const auth = (req, res) => {
    userModel.auth(response => {
        res.status(200).send(response)
    }, req.body)
}

module.exports = {
    getUsers,
    getUserById,
    register,
    auth
}