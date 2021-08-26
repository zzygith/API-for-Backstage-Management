//Import database module
const db = require('../db/index');

module.exports.addArticle = (req, res) => {
    const articleInfo = {
        //Including article title, content, state, category
        ...req.body,
        pub_date: new Date(),
        author_id:req.user.id
    }
    const sql = 'insert into ev_articles set ?';
    db.query(sql, articleInfo, (err, results) => {
        if (err) {
            res.send({
                status: 1,
                message:err.message
            })
        }
        if (results.affectedRows!==1) {
            return res.send({
                status: 1,
                message:'Fail to publish article.'
            })
        }
        res.send({
            status: 0,
            message:'Publish article successfully!'
        })
    })
    
}

module.exports.getArticleList = (req, res) => {
    const sql = 'select id,title, pub_date, state, cate_id from ev_articles where author_id=? and is_delete=0'
    db.query(sql, req.user.id, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message:err.message
            })
        }
        res.send({
            status: 0,
            message: 'Get article successfully!',
            data:results
        })
    })
    
}

module.exports.deleteArticle = (req, res) => {
    const sql = 'update ev_articles set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message:err.message
            })
        }
        res.send({
            status: 0,
            message: 'Delete article successfully!',
        })
    })
}

module.exports.getArticle = (req, res) => {
    const sql = 'select * from ev_articles where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message:err.message
            })
        }
        res.send({
            status: 0,
            message: 'Get article successfully!',
            data:results
        })
    })
}