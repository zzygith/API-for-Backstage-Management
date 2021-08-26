const express = require('express');
const router = express.Router();

//Manipulation function for router
const articlehandle = require('../router_handler/article')

//Middleware for verify data
const expressJoi = require('@escook/express-joi');

//Validation rule
const {add_article_schema}=require('../schema/article')


router.post('/add', expressJoi(add_article_schema), articlehandle.addArticle);

router.get('/list', articlehandle.getArticleList);

router.get('/delete/:id', articlehandle.deleteArticle);

router.get('/:id', articlehandle.getArticle);

module.exports = router;