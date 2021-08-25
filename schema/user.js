const joi = require('joi');
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
module.exports.reg_login_schema = {
    //Verify the data in body of register and login
    body: {
        username:username,
        password:password
    }
}

module.exports.update_userinfo_schema = {
    //Verify the data in body of update
    body: {
        id:id,
        nickname:nickname,
        email:email
    }
}

module.exports.update_password_schema = {
    //Verify the data in body of update
    body: {
        oldPwd: password,
        newPwd:joi.not(joi.ref('oldPwd')).concat(password)
    }
}