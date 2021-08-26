//Import database module
const db = require('../db/index');

//Import bcrypt module
const bcrypt = require('bcryptjs');

//Import Token module
const jwt = require('jsonwebtoken');
const config=require('../config')


module.exports.regUser = (req, res) => {
    const userinfo = req.body;

    const sqlStr = 'select * from ev_users where username=?';
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.length > 0) {
            return res.send(
                {
                    status: 1,
                    message: 'Username has been occupied!'
                }
            )
        }

        //Encrypt password
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sql = 'insert into ev_users set ?';
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            };
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: "Sigin in unsuccessfully!"
                })
            }
            res.send({
                status: 0,
                message: 'Sign in successfully!'
            })
        })

    });

};

module.exports.login = (req, res) => {
    const userinfo = req.body;

    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        //Fail to execute sql.
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.length !== 1) {
            return res.send({
                status: 1,
                message: 'Log in unsuccessfully.'
            })
        }
        //Verify the password.
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) {
            return res.send({
                status: 1,
                message: 'Log in unsuccessfully.'
            })
        }
        
        //Generate Token string.
        const user = { ...results[0], password: '' };
        const tokenStr=jwt.sign(user, config.jwtSecretKey, {expiresIn:config.expiresIn})
        res.send({
            status: 0,
            message: 'Log in successfully!',
            token: 'Bearer '+tokenStr
        })
    })

};