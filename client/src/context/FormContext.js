import React,{useState,useEffect,createContext} from 'react';
import {setCookie, getCookie ,deleteCookie} from '../util/cookie';
import {verify} from '../api/auth'

const FormContext = createContext();

const authCookieCheck = () => {
  return (getCookie('token').length > 0) ? true : false
}



const FormProvider = (props) => {
  const [isAuth, setIsAuth] = useState(authCookieCheck())
  const [token, setToken] = useState()

  const settingToken = (token)=> setToken(token)
  const removeToken = ()=> {
    deleteCookie('token')
    setIsAuth(false)
    setToken('')
  }

  useEffect(()=>{
    if(token && token.message){
      console.log('token',token.exp)
      setCookie('token',token.token,token.exp)
      setIsAuth(true)
    }
  },[token])

  const isDoingAuth = (success, fail)=> {
    const vetifyToken = getCookie('token')
    if(isAuth){
      console.log('verify')
      verify(vetifyToken,
        (data)=>{
          setIsAuth(true)
          console.log('success')
          success(data)
          return true
        },
        (err)=>{
          removeToken()
          alert('login again')
          console.log('fail')
          fail(err)
          return false
        }
      ) // return bool
    }
  }

  return <FormContext.Provider 
  value={{token, settingToken ,isAuth, authCookieCheck,isDoingAuth,removeToken}}
  >{props.children}</FormContext.Provider>
}

const FormConsumer = FormContext.Consumer;
export {FormProvider , FormContext , FormConsumer}



