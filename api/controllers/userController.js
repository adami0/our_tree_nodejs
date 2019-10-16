'use strict'
const userModel = require('./../models/userModel')
const jwt = require('jsonwebtoken')
const fs = require('fs');

//reserved to admin
const getNbOfUsers = (req, res) => {
    if (res.error === false) {
        userModel.getNbOfUsers(response => {
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
    if (!res.error) {
        userModel.getUserByEmail(response => {
            console.log('response error: ' + response.error);
            console.log('!response error: ' + !response.error);
            res.error = false;
            return res.status(200).send(response)
        }, req.params.email)
    } else {
        res.error = true;
        return res.status(403).send(response);
    };
}

//insert new user in db
const register = (req, res) => {
    console.log('yo')
    console.log(req.body);
    console.log('res :' + res);
    userModel.register(response => {
        if (response.error === false) {
            res.status(201).send(response);
        } else {
            res.status(500).send(response);
        }
    }, req.body)
}

//check user authentification
const auth = (req, res) => {
    userModel.auth(response => {
        //checking if auth was successful, if it's the case generate token
        if (response.error === false) {
            console.log("resp email: " + response.email);
            let private_key = fs.readFileSync('private.key', 'utf-8');
            const token = jwt.sign(
                { email: response.email },
                private_key,
                { expiresIn: '10h', algorithm: 'RS256' }
            );
            console.log("token: " + token);
            response.token = token;
            return res.status(200).send(response);
        } else {
            return res.status(403).send(response);
        }
    }, req.body);
}

const authByToken = (req, res) => {
    if (res.error === false) {
        userModel.authByToken(response => {
            if (response.error === false) {
                return res.status(200).send(response);
            } else {
                return res.status(403).send(response);
            }
        }, req.body);
    } else {
        return res.status(403).send(response);
    }
}

module.exports = {
    getNbOfUsers,
    getUsers,
    getUserById,
    getUserByEmail,
    register,
    auth,
    authByToken
}