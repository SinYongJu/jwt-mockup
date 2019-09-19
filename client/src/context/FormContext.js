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
  const [timer, setTimer] = useState(0)

  const settingToken = (token)=> setToken(token)
  const removeToken = ()=> {
    deleteCookie('token')
    setIsAuth(false)
    setToken('')
  }

  useEffect(()=>{
    if(token && token.message){
      console.log(token)
      setTimer(token.exp - token.iat)
      setCookie('token',token.token,token.exp)
      setIsAuth(true)
    }
  },[token])



  const isDoingAuth = (fail)=> {
    const vetifyToken = getCookie('token');
    if(isAuth && vetifyToken){
      console.log('verify')
      verify(vetifyToken,
        (data)=>{
          console.log('success')
          setIsAuth(true)
        },
        (err)=>{
          removeToken()
          setIsAuth(false)
          fail(err)
          return
      })
    }else{
      setIsAuth(false)
      return fail()
    }
  }
  

  return <FormContext.Provider 
  value={{token, settingToken ,isAuth, authCookieCheck,isDoingAuth,removeToken,timer}}
  >{props.children}</FormContext.Provider>
}

const FormConsumer = FormContext.Consumer;
export {FormProvider , FormContext , FormConsumer}



