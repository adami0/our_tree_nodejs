'use strict';
const express = require('express');
const router = express.Router();
const checkToken = require('./../middlewares/checkToken');

//imports controller
const treeController = require('./../controllers/treeController');


//get trees by user id
router.post('/:id', checkToken.checkToken, treeController.getTreesByUserId);

//create tree
router.post('/post_tree', treeController.createTree);

//update tree
router.put('/update_tree', treeController.updateTree);

module.exports = router;


