'use strict';
const express = require('express');
const router = express.Router();
const memberController = require('./../controllers/memberController');
const checkToken = require('./../middlewares/checkToken');


//get members by id
router.get('/by_id/:id', memberController.getMemberById);

//get all members of a tree
router.post('/all_by_tree', checkToken.checkToken, memberController.getAllMembersByTreeId);

//add a member
router.post('/post_member', memberController.createMember);

//retrieve informations about a member
router.post('/get_member_by_firstname_lastname', memberController.getMemberByFirstnameAndLastname);

//update a member
router.put('/update_member', checkToken.checkToken, memberController.updateMember)

//delete a member
router.delete('/delete_member', checkToken.checkToken, memberController.deleteMember);

module.exports = router;