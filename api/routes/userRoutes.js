'use strict';
const express = require('express');
const router = express.Router();

//imports controllers
const userController = require('./../controllers/userController');
//const checkAuth = require('./../middlewares/check-auth');

//get all users
router.get('/', /*checkAuth,*/ userController.getUsers);

//get user by id
//router.get('/:id', userController.getUserById);

//get user by email
router.get('/:email', userController.getUserByEmail);

//register user
router.post('/register', userController.register);

//authenticate user
router.post('/auth', userController.auth);

module.exports = router;