const express = require('express');
const app = express();

const joi = require('joi')

//Cors middleware
const cors = require('cors');
app.use(cors());

//Parse data
app.use(express.urlencoded({ extended: false }));


//Token middleware
const config = require('./config');
const expressJWT = require('express-jwt');
app.use(expressJWT({
    secret: config.jwtSecretKey
}).unless({path:[/^\/api\//]}))


//User router module
const userRouter = require('./router/user');
app.use('/api', userRouter);

//Userinfo router module
const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);


//Add or deleted article router
const articleRouter = require('./router/article');
app.use('/my/article', articleRouter);


app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return  res.send({
        status: 1,
        message: err.message
    })
    }
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 1,
            message:'Fail to verify ID.'
        })
        
    }

})

//Start sever
/* app.listen(3007, () => {
    console.log('api server is running at http://127.0.0.1:3007');
}) */

//Start sever
 app.listen(process.env.PORT || 3007, () => {
    console.log('api server is running at http://127.0.0.1:3007');
})