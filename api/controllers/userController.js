'use strict'
const userModel = require('./../models/userModel')
const jwt = require('jsonwebtoken')
const fs = require('fs');

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

const getUserByEmail = (req, res) => {
    userModel.getUserByEmail(response => {
        res.status(200).send(response)
    }, req.params.email);
}

//insert new user in db
const register = (req, res) => {
    console.log('yo')
    console.log(req.body);
    console.log('res :' + res);
    userModel.register(response => {
        if (!response.error) {
            res.status(201).send(response);
        } else {
            res.status(500).send(response);
        }
    }, req.body)
}

//check user authentification
const auth = (req, res) => {
    userModel.auth(response => {
        //checking if auth was successful, if true generate token
        if (!response.error) {
            console.log("resp email: " + response.email);
            let private_key = fs.readFileSync('private.key', 'utf-8');
            const token = jwt.sign(
                { email: response.email },
                private_key,
                { expiresIn: '10h', algorithm: 'RS256' }
            );
            console.log("token" + token);
            response.token = token;
            return res.status(200).send(response);
        } else {
            return res.status(403).send(response);
        }
    }, req.body)
}

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    register,
    auth
}