const express = require('express');
const router = express.Router();

//Manipulation function for router
const articlehandle = require('../router_handler/article')

//Middleware for verify data
const expressJoi = require('@escook/express-joi');

//Validation rule
const {add_article_schema}=require('../schema/article')


router.post('/add', expressJoi(add_article_schema), articlehandle.addArticle);

module.exports = router;