const express = require('express');
const router  =  express.Router();
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const config = require('./config.js')


// jwt
/**
 * 
 * 
 * jwt의 전달시 필드 값들은 거의 3자로 
 * 제한한다
 * 공식 사이트 참고 
 * 
 * 
 */

const setIat = () => Date.now()+( 0.25 * 24 * 60 * 60 * 1000)
const setExp = () => Date.now()+( 0.25 * 24 * 60 * 60 * 1000) + (10)

const user = {
  data : {id : 1 ,
          name : 'lukas',
          pwd : '1234'
        }
}



app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())
app.use(router)

router.post('/auth',(req,res) => {
  console.log('request body',req.body)
  if(req.body.pwd === user.data.pwd && req.body.name === user.data.name){
    console.log('access')
    const tokenUserData = {...user, iat: setIat(),exp: setExp()}
    jwt.sign(tokenUserData,config.secret,(err, token)=>{
      if(err){
        console.log(err)
      }
     res.status(200).json({
        code : '200',
        message : 'success',
        exp : tokenUserData.exp,
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
  const token = req.header('Authorization').split(' ')[1];
  jwt.verify(token, config.secret,(err, decoded)=> {
    if(err){
      console.log(err)
      if(err.message == 'jwt expired' || err.message == 'jwt malformed'){
        return res.status(403).json({code : 403, message : err, auth : false})
      }else{
        return res.status(500).json({code : 500, message : err, auth : false})
      }
    }
    console.log('verify',decoded) // data
    return res.json({code : 200, message : 'success', auth : true})
  });
  
})

router.get('/',(req,res) => {
  console.log('get')
  res.send('Hello World')
})


app.listen(PORT,()=>{
  console.log(`sever listen ...PORT : ${PORT}`);
})

