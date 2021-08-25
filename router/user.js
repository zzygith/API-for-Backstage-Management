const express = require('express');
const router = express.Router();

//Manipulation function for router
const userHandle = require('../router_handler/user');

//Middleware for verify data
const expressJoi = require('@escook/express-joi');

//Validation rule
const { reg_login_schema } = require('../schema/user');

router.post('/reguser', expressJoi(reg_login_schema), userHandle.regUser);

router.post('/login', expressJoi(reg_login_schema), userHandle.login);

module.exports = router