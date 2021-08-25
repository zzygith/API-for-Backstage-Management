//Import database module
const db = require('../db/index');

//Import bcrypt module
const bcrypt = require('bcryptjs');

//Function for getting user information
module.exports.getUserInfo = (req, res) => {
    const sqlStr = 'select id, username, nickname, email from my_db_01.ev_users where id=?';
    db.query(sqlStr, req.user.id, (err,results) => {
        if (err) {
            return res.send({
                status: 1,
                message:err.message
            })
        }
        if (results.length !== 1) {
            return res.send({
                status: 1,
                message:'Fail to get user information'
            })
        }
        res.send({
            status: 0,
            message: 'Get user information successfully!',
            data: results[0]
        })
    })
}

//Function for updating user information
module.exports.updateUserInfo = (req, res) => {
    const sqlStr = 'update my_db_01.ev_users set ? where id=?';
    db.query(sqlStr, [req.body,req.body.id], (err,results) => {
        if (err) {
            return res.send({
                status: 1,
                message:err.message
            })
        }
        if (results.affectedRows !== 1) {
            return res.send({
                status: 1,
                message:'Fail to update user information'
            })
        }
        res.send({
            status: 0,
            message: 'Update user information successfully!',
        })
    })
  
}

//Function for updating user password
module.exports.updatePassword = (req, res) => {
    //Find the user information for comparing password
    const sqlStr = 'select * from my_db_01.ev_users where id=?';
    db.query(sqlStr, req.user.id, (err,results) => {
        if (err) {
            return res.send({
                status: 1,
                message:err.message
            })
        }
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) {
            return res.send({
                status: 1,
                message: 'The old password is wrong'
            })
        }
        
        //Update the password
        const sqlStr = 'update my_db_01.ev_users set password=? where id=?';
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        db.query(sqlStr, [newPwd,req.user.id], (err,results) => {
            if (err) {
                return res.send({
                    status: 1,
                    message:err.message
                })
            }
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message:'Fail to update user password'
                })
            }
            res.send({
                status: 0,
                message: 'Update user password successfully!',
            })
        })

  
    }) 
  
}