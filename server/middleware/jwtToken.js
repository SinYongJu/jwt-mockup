
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config')
const SECRET = config.secret

// console.log()
// const dataPath = path.join(__dirname,'../data/data.json');
// const data = fs.readFileSync(dataPath,'utf8');
// console.log(data)
const user = {
  data :
    {
        id : 1 ,
        name : "lukas",
        pwd : "1234",
        role : "admin"
    }
}




const setIat = () => Date.now()+ 1000
const setExp = () => Date.now()+ 1000 + 10000 // 10초 추가
function tokenMaker(){
  const tokenUserData = {"name" : user.data.name, "id" : user.data.id, "role" : user.data.role, iat: setIat(),exp: setExp()}
  const accessToken = jwt.sign(tokenUserData,SECRET)
  delete tokenUserData.name,tokenUserData.id,tokenUserData.iat
  tokenUserData.exp = setExp() + 10000
  const refreshToken = jwt.sign(tokenUserData,SECRET)
  return {accessToken, refreshToken}
}
function jwtVerify (token,error,next){
  jwt.verify(token, SECRET,(err, decoded)=> {
    if(err){
      console.log(err)
      if(err.message == 'jwt expired' || err.message == 'jwt malformed'){
        return error({code : 403, message : err, auth : false})
      }else{
        return error({code : 500, message : err, auth : false})
      }
    }
    return next({code : 200, message: 'success',auth : true},decoded)
  });
}
module.exports = {
  jwtSignUp({pwd,name},error,next){
    if(pwd === user.data.pwd && name === user.data.name){
      console.log('access')
      const {accessToken , refreshToken} = tokenMaker();
      next(accessToken , refreshToken)
    }else{
      error()
    }
  },
 
  jwtRefresh(token,error,success){
    return jwtVerify(token,
      (err)=>error(err),
      (result)=>{
        const {accessToken , refreshToken} = tokenMaker();
          return success({accessToken, refreshToken,...result})
    })
  },
  jwtVerify

  
}