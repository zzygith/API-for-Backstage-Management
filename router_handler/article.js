//Import database module
const db = require('../db/index');

module.exports.addArticle = (req, res) => {
    const articleInfo = {
        //Including article title, content, state, category
        ...req.body,
        pub_date: new Date(),
        author_id:req.user.id
    }
    const sql = 'insert into my_db_01.ev_articles set ?';
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