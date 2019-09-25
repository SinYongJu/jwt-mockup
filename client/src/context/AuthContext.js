import React,{useState,useEffect,createContext} from 'react';
import {login ,logout ,checkAccessToken , checkRefreshToken, getDecodedToken} from '../api/auth'
import UserInfo from '../user/userInfo'
import {withRouter} from "react-router";

const  AuthContext = createContext();
// https 프로토콜 

const AuthProviderNoRouter = (props) => {
  const userInfoForm = {
    "name": 'user0',
    "id": 0,
    "role": 'guest'
  }
  
  const userInfoObj = new UserInfo(userInfoForm);
  const [isAuth, setIsAuth] = useState(false)  
  const [userInfo, setUserInfo] = useState(userInfoObj)

  const authLogoutHandler = ()=> {
    console.log('call removeToken')
    tokenExpiredHandler()
  }

  const tokenExpiredHandler = () => {
    setIsAuth(false)
    setUserInfo(userInfoObj)// 공백으로 만들기 초기화
    goToAddress('/login')
    logout()
  }
  const goToAddress = (url) => {
    return props.history.push(url)
  }

  const setUserInfoData = token =>  {
    // token 파싱은 auth.js 에서 수행
    // 유효성 검사까지 auth.js 
    const {name, role, id} = token
    const userData = {"name":name, 'id' : id ,role : role}    
    const newUserInfo = new UserInfo(userData)
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
      if(isAuth && isAccess && userInfo) {
          console.log('access cli')
          return setIsAuth(true)
      }
      const isRefresh = await checkRefreshToken();
      if(isRefresh){
        console.log('have refresh ', isRefresh)
        setUserInfoData(getDecodedToken())
        return setIsAuth(true)
      } else { 
        console.log('expired refresh')
        setUserInfoData(userInfoForm)
        return setIsAuth(false)
      }
    } catch(e) {
      // 에러 핸들링, 에러에 대한 로그 처리 등
      return setIsAuth(false)
    }
    
  }

  const onSubmit = (e, body) => {
    e.preventDefault();
      login(body).then(data =>{ 
        setIsAuth(true)
        setUserInfoData(getDecodedToken())
        return data
      }).then(
        props.history.push('/')
      ).catch(errorHandler)
      
  }  
  
  const errorHandler = (err) => console.log(err)

  return <AuthContext.Provider 
  value={{isAuth, userInfo, isExpiredToken,tokenExpiredHandler, authLogoutHandler, onSubmit}}
  >{props.children}</AuthContext.Provider>
}
const AuthConsumer = AuthContext.Consumer;
const AuthProvider = withRouter(AuthProviderNoRouter)
export {AuthProvider ,AuthContext , AuthConsumer}



