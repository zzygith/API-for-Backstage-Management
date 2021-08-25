const express = require('express');
const router = express.Router();

//Manipulation function for router
const userinfoHandle = require('../router_handler/userinfo');

//Middleware for verify data
const expressJoi = require('@escook/express-joi');

//Validation rule
const { update_userinfo_schema, update_password_schema } = require('../schema/user');

router.get('/userinfo', userinfoHandle.getUserInfo);

router.post('/userinfo', expressJoi(update_userinfo_schema), userinfoHandle.updateUserInfo);

router.post('/updatepwd',expressJoi(update_password_schema), userinfoHandle.updatePassword)

module.exports=router