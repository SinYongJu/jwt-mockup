import React,{useState,useEffect,createContext} from 'react';
import {isLogIn,logout} from '../api/auth'
import decoded from "jwt-decode";

const FormContext = createContext();


const FormProvider = (props) => {
  const [isAuth, setIsAuth] = useState(isLogIn())
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
    if(isLogIn() && token){      
      const parsedToken = decoded(token);
      const { iat , exp } = parsedToken;
      setTimer(exp - iat)
      setIsAuth(true)
    }
  },[token])

  useState(() => {
    console.log('isAuth')
  },[isAuth])

  const isLogined = () => {
    console.log(isAuth)
    console.log('call isLogined')
    if(isAuth && isLogIn()){
      setIsAuth(true)
    }else{
      setIsAuth(false)
    }
  }
  
  return <FormContext.Provider 
  value={{token, settingToken ,isAuth,isLogined,removeToken,timer}}
  >{props.children}</FormContext.Provider>
}

const FormConsumer = FormContext.Consumer;
export {FormProvider , FormContext , FormConsumer}



