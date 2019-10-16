'use strict';
const express = require('express');
const router = express.Router();

//imports controllers
const userController = require('./../controllers/userController');
const checkToken = require('./../middlewares/checkToken');
const checkUserEmail = require('./../middlewares/checkUserEmail');


//get all users
router.get('/', /*checkAuth,*/ userController.getUsers);

//get user by id
//router.get('/:id', userController.getUserById);

//get user by email
router.post('/email/:email', checkToken.checkToken, checkUserEmail.checkUserEmail, userController.getUserByEmail);

//register user
router.post('/register', userController.register);

//authenticate user
router.post('/auth', userController.auth);

//authenticate user by checking token in his browser
router.post('/auth_by_token', checkToken.checkToken, userController.authByToken);

//reserved to admin, it gives him nb of users
router.post('/nb_users', checkToken.checkToken, userController.getNbOfUsers);

module.exports = router;