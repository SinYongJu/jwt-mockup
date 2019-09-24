const express = require('express');
const router  =  express.Router();
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;
const cors = require('cors');
const {jwtSignUp,jwtRefresh} = require('./middleware/jwtToken')
const {getlist} = require('./middleware/getlist')



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



/**
 * 
 * 단방향 암호화 방식 
 * 클라이언트 : 디코드
 * 서버 : 토큰만 날려라 ! 토큰외에 다른 정보를 날리지 않는다 변조가 가능하므로 
 * 민감성 정보 X , 토큰 안에 들어간건 노출 X 
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});


// function tokenMaker(){
//   const tokenUserData = {"name" : user.data.name, "id" : user.data.id, "role" : user.data.role, iat: setIat(),exp: setExp()}
//   const accessToken = jwt.sign(tokenUserData,SECRET)
//   delete tokenUserData.name,tokenUserData.id,tokenUserData.iat
//   tokenUserData.exp = setExp() + 10000
//   const refreshToken = jwt.sign(tokenUserData,SECRET)
//   return {accessToken, refreshToken}
// }

router.post('/auth/sign',(req,res) => {  
  console.log('request body',req.body)
  jwtSignUp(req.body ,()=>{
    res.status(403).json({
      code : '403',
      message : 'no sign',
    })
  }, (accessToken , refreshToken)=>{
    console.log('sign')
    res.status(200).json({
      code : '200',
      message : 'success',
      accessToken,
      refreshToken
    })
  })
})

router.post('/auth/refresh',(req,res) => {
  console.log('refresh')
  const token = req.header('Authorization').split(' ')[1];
  console.log(token)
  jwtRefresh(token,
      (err) => {
          return res.status(err.code).json(err)
      },
      (result) => {
          return res.status(result.code).json(result)
      }

  ) 
})
router.get('/list',(req,res) => {
  console.log('list')
  const token = req.header('Authorization').split(' ')[1];
  getlist(token,
    (err) => {
        return res.status(err.code).json(err)
    },
    (data,result) => {
        return res.status(result.code).json(data)
    }

) 
})
app.listen(PORT,()=>{
  console.log(`sever listen ...PORT : ${PORT}`);
})

