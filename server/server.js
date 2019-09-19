const express = require('express');
const router  =  express.Router();
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const config = require('./config.js')
const SECRET = config.secret


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

const setIat = () => Date.now()+ 1000
const setExp = () => Date.now()+ 1000 + 10000 // 10초 추가

const user = {
  data : {id : 1 ,
          name : "lukas",
          pwd : "1234"
        }
}

/**
 * 
 * 공부 할것 
 * 1. async await . promise
 * 2. generater
 * 3. 전개 연산자 
 * 4. 모듈 패턴?! 
 * 
 */

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())
app.use(router)

router.post('/auth',(req,res) => {
  
  console.log('request body',req.body)
  if(req.body.pwd === user.data.pwd && req.body.name === user.data.name){
    console.log('access')
    const tokenUserData = {name : user.data.name, id : user.data.id, iat: setIat(),exp: setExp()}
    jwt.sign(tokenUserData,SECRET,(err, token)=>{
      if(err){
        console.log(err)
      }
     res.status(200).json({
        code : '200',
        message : 'success',
        exp : tokenUserData.exp,
        iat : tokenUserData.iat,
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
  jwt.verify(token, SECRET,(err, decoded)=> {
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

