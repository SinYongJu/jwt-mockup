import React,{useState,useEffect,createContext} from 'react';
import {isExpiredToken,logout} from '../api/auth'
import decoded from "jwt-decode";

const AuthContext = createContext();


const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(isExpiredToken())
  const [token, setToken] = useState()
  
  const [timer, setTimer] = useState(0)


  const settingToken = (token)=> setToken(token)
  const removeToken = ()=> {
    
    console.log('call removeToken')
    setIsAuth(false)
    setToken('')
    logout()
  }
  useEffect(()=>{
    if(isExpiredToken() && token){      
      const parsedToken = decoded(token);
      const { iat , exp } = parsedToken;
      setTimer(exp - iat)
      setIsAuth(true)
    }
  },[token])

  useState(() => {
    console.log('isAuth')
  },[isAuth])

  const isLogin = () => {
    console.log(isAuth)
    console.log('call isLogined')
    if(isAuth && isExpired()){
      setIsAuth(true)
    }else{
      console.log('expire')
      setIsAuth(false)
    }
  }


  // 실제 상태값 및 세팅은 여기서 진행하도록 한다
  /*
    refresh를 위한 로직을 위해 
    리프레쉬 토큰을 체크하는 로직을 여기에 둔다
  */



  
  const isExpired = async () => {
    // const isAccess = await checkAccessToken
    // if(isAccess) {
    //   setAccessToken
    //   return true
    // }
    
    // const isRefresh = await checkRefreshToken
    // if(isRefresh) {
    //   setAccessToken
    //   setRefreshToken
    //   return true
    // } else {
    //   return false
    //}
   return isExpiredToken()
  }
  
  return <AuthContext.Provider 
  value={{token, settingToken ,isAuth,isLogin,removeToken,timer}}
  >{props.children}</AuthContext.Provider>
}

const AuthConsumer = AuthContext.Consumer;
export {AuthProvider , AuthContext , AuthConsumer}



