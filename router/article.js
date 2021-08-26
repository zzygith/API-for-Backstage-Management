const express = require('express');
const router = express.Router();

//Manipulation function for router
const articlehandle = require('../router_handler/article')

//Middleware for verify data
const expressJoi = require('@escook/express-joi');

//Validation rule
const { add_article_schema } = require('../schema/article')

//Multer and path for formdate
const multer = require('multer');
const path = require('path');
const uploads = multer({
    dest:path.join(__dirname, '../uploads')
})


router.post('/add',uploads.single('img'), expressJoi(add_article_schema), articlehandle.addArticle);

router.get('/list', articlehandle.getArticleList);

router.get('/delete/:id', articlehandle.deleteArticle);

router.get('/:id', articlehandle.getArticle);

module.exports = router;