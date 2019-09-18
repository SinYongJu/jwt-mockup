import React,{useState,useEffect,createContext} from 'react';
import {setCookie, getCookie ,deleteCookie} from '../util/cookie';
import {verify,login} from '../api/auth'

const FormContext = createContext();

const authCookieCheck = () => {
  return (getCookie('token').length > 0) ? true : false
}



const FormProvider = ({children,...props}) => {
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
    }
    setIsAuth(authCookieCheck())
  },[token])
  
  useEffect(()=>{
    isDoingAuth()
  },[isAuth])

  const isDoingAuth = ()=> {
    const token = getCookie('token');
    if(token){
      verify(token.token,
        ()=>{
          setIsAuth(true)
          console.log('success')
          alert(isAuth) 
          return true
        },
        (err)=>{
          removeToken()
          alert('login again')
          console.log('fail')
          alert(isAuth)
          props.history.push('/login')
          return false
        }
      ) // return bool
    }
  }

  return <FormContext.Provider 
  value={{token, settingToken ,isAuth, authCookieCheck,isDoingAuth,removeToken}}
  >{children}</FormContext.Provider>
}

const FormConsumer = FormContext.Consumer;
export {FormProvider , FormContext , FormConsumer}



