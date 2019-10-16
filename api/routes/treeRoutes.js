'use strict';
const express = require('express');
const router = express.Router();
const checkToken = require('./../middlewares/checkToken');
const checkUserEmail = require('./../middlewares/checkUserEmail');

//imports controller
const treeController = require('./../controllers/treeController');


//get trees by user id
router.post('/user_id/:id', checkToken.checkToken, checkUserEmail.checkUserEmail, treeController.getTreesByUserId);

//create tree
router.post('/post_tree', checkToken.checkToken, checkUserEmail.checkUserEmail, treeController.createTree);

//update tree
router.put('/update_tree', checkToken.checkToken, checkUserEmail.checkUserEmail, treeController.updateTree);

//reserved to admin, it gives him nb of trees
router.post('/nb_trees', checkToken.checkToken, treeController.getNbOfTrees);


module.exports = router;


