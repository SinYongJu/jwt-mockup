const express = require('express');
const router  =  express.Router();
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const config = require('./config.js')


// jwt
const user = {
  data : {id : 1 ,
          name : 'lukas',
          pwd : '1234'
        },
  iat: Math.floor(Date.now() / 1000) - 30,
  exp: Math.floor(Date.now() / 1000) + (60 * 2),
}


app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())
app.use(router)

router.post('/auth',(req,res) => {
  console.log(req.body)
  if(req.body.pwd === user.data.pwd && req.body.name === user.data.name){
    console.log('access')
    jwt.sign(user,config.secret,(err, token)=>{
      if(err){
        console.log(err)
      }
      res.status(200).json( {
        code : '200',
        message : 'success',
        token
      })
    })
  }else{
    res.status(403).json({
      code : '403',
      message : 'Forbidden'})
  }
})

router.post('/verify',(req,res) => {
  console.log('verify acccess')
  
})

router.get('/',(req,res) => {
  console.log('get')
  res.send('Hello World')
})


app.listen(PORT,()=>{
  console.log(`sever listen ...PORT : ${PORT}`);
})

