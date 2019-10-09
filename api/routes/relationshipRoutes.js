'use strict';
const express = require('express');
const router = express.Router();
const relationshipController = require('./../controllers/relationshipController');


//get relationships by tree id
router.get('/:tree_id', relationshipController.getRelationshipsByTreeId);

//create relationship between one member and another
router.post('/post_relationship', relationshipController.createRelationship);

module.exports = router;