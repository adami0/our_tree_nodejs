'use strict';
const express = require('express');
const router = express.Router();

//imports controller
const treeController = require('./../controllers/treeController');


//get trees by user id
router.get('/:id', treeController.getTreesByUserId);

module.exports = router;


