const joi = require('joi');
const title = joi.string().required();
const cate_id = joi.number().required();
const content = joi.string().required().allow('');
const state = joi.string().valid('draft', 'submitted').required();

module.exports.add_article_schema = {
    body: {
        title: title,
        cate_id: cate_id,
        content: content,
        state: state
    }
}