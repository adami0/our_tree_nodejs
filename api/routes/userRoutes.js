'use strict';
const express = require('express');
const router = express.Router();

//imports controllers
const userController = require('./../controllers/userController');
//const checkAuth = require('./../middlewares/check-auth');

//get all users
router.get('/', /*checkAuth,*/ userController.getUsers);

//get user by id
router.get('/:id', userController.getUserById);

//register user
router.post('/register', userController.register);

module.exports = router;