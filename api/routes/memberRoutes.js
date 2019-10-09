'use strict';
const express = require('express');
const router = express.Router();
const memberController = require('./../controllers/memberController');

//get members by id
router.get('/:id', memberController.getMemberById);

//get all members of a tree
router.get('/all/:tree_id', memberController.getAllMembersByTreeId);

//add a member
router.post('/post_member', memberController.createMember);

//retrieve informations about a member
router.post('/get_member_by_firstname_lastname', memberController.getMemberByFirstnameAndLastname);

module.exports = router;