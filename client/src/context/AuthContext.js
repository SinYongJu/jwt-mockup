import React,{useState,useEffect,createContext} from 'react';
import {login ,logout ,checkAccessToken , checkRefreshToken} from '../api/auth'
import {withRouter} from "react-router";

import decoded from "jwt-decode";

const AuthContext = createContext();


const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false)  
  
  const authLogout = ()=> {
    console.log('call removeToken')
    setIsAuth(false)
    logout()
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
    const isAccess = checkAccessToken()
    if(isAuth && isAccess) {
        console.log('access cli')
        return setIsAuth(true)
    }
    const isRefresh = await checkRefreshToken();
    if(isRefresh){
      console.log('refresh cli', isRefresh)
      return setIsAuth(true)

    } else { 
      console.log('refresh false')
      return setIsAuth(false)
    }
  }
  const onSubmit = (e, body,callback) => {
    console.log('클릭')
    e.preventDefault();
      login(body).then(callback).catch(errorHandler)
  }
  const errorHandler = (err) => console.log(err)

  return <AuthContext.Provider 
  value={{isAuth, isExpiredToken, authLogout, onSubmit}}
  >{props.children}</AuthContext.Provider>
}
const AuthConsumer = AuthContext.Consumer;
export {AuthProvider ,AuthContext , AuthConsumer}



