const {jwtVerify} = require('./jwtToken')
const list = {
    data : [
      {
        id : 1 ,
        title : "lukas01",
        role : "admin"
      },
      {
        id : 2 ,
        title : "lukas02",
        role : "user"
      },
      {
        id : 3 ,
        title : "lukas03",
        role : "user"
      },
    ] 
  }
module.exports = {
    getlist(token,error,success){
        return jwtVerify(token,
            (err)=>error(err),
            (result)=>{
                return success(list.data,result)
          })
    }
}