import React,{useState,useEffect,createContext} from 'react';
import {login ,logout ,checkAccessToken , checkRefreshToken, getDecodedToken} from '../api/auth'
import UserInfo from '../user/userInfo'

const  AuthContext = createContext();
// https 프로토콜 

const AuthProvider = (props) => {
  const userInfoForm = {
    "name": 'user1',
    "id": 0,
    "role": 'guest'
  }
  const userInfoObj = new UserInfo(userInfoForm);
  const [isAuth, setIsAuth] = useState(false)  
  const [userInfo, setUserInfo] = useState(userInfoObj)
  
  React.useMemo(()=> {
    console.log('call')
  },[userInfo])
  
  const authLogout = ()=> {
    console.log('call removeToken')
    setIsAuth(false)
    setUserInfo(userInfoObj)// 공백으로 만들기 초기화
    logout()
  }

  const setUserInfoData = token =>  {
    // token 파싱은 auth.js 에서 수행
    // 유효성 검사까지 auth.js 
    const {name, role, id} = token
    
    const userData = {"name":name, 'id' : id ,role : role}
    
    console.log(userData)
    
    const newUserInfo = new UserInfo(userData)
    console.log('setUserInfoData', newUserInfo)
    return setUserInfo(newUserInfo)
    
  }
  

  useEffect(()=>{
    isExpiredToken()
  },[isAuth])

  

  

  // 실제 상태값 및 세팅은 여기서 진행하도록 한다
  /*
    refresh를 위한 로직을 위해 
    리프레쉬 토큰을 체크하는 로직을 여기에 둔다
  */
  
  const isExpiredToken = async () => {
    try {
      const isAccess = checkAccessToken()
      if(isAuth && isAccess) {
          console.log('access cli')
          return setIsAuth(true)
      }
      const isRefresh = await checkRefreshToken();
      if(isRefresh){
        console.log('have refresh ', isRefresh)
        return setIsAuth(true)
      } else { 
        console.log('expired refresh')
        return setIsAuth(false)
      }
    } catch(e) {
      // 에러 핸들링, 에러에 대한 로그 처리 등
      return setIsAuth(false)
    }
    
  }

  const onSubmit = (e, body,callback) => {
    console.log('클릭')
    e.preventDefault();
      login(body).then(data =>{ 
        setIsAuth(true)
        setUserInfoData(getDecodedToken())
        return data
      }).then(callback).catch(errorHandler)
      
  }  
  
  const errorHandler = (err) => console.log(err)

  return <AuthContext.Provider 
  value={{isAuth, userInfo, isExpiredToken, authLogout, onSubmit}}
  >{props.children}</AuthContext.Provider>
}
const AuthConsumer = AuthContext.Consumer;
export {AuthProvider ,AuthContext , AuthConsumer}



