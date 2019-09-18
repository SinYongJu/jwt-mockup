import React,{useState,useEffect,useContext} from 'react';
import { withRouter } from 'react-router-dom'
import style from './Form.scss'
import {FormContext} from '../context/FormContext'
import {verify,login} from '../api/auth'





const Form = (props) =>{
  const {isAuth,settingToken,removeToken} = useContext(FormContext)
  const [userName, setUserName] = useState('lukas')
  const [pwd, setPwd] = useState('1234')


  const onChangeUserName = (e)=>{
    setUserName(e.target.value)
  }

  const onChangePwd = (e)=>{
    setPwd(e.target.value)
  }

  const errorHandler = (err) => console.log(err)
  const onSubmit = (e) => {
    
    e.preventDefault();
      const body = {name : userName , pwd};
      login(body,(data) => {
        console.log('Form', data)
        settingToken(data)        
        props.history.push('/') // home 진입  
      },errorHandler)
    
  }

  const onClickLogout = ()=>{
    console.log('click')
    removeToken();
  }

  return (
    <>
    <h2>Login</h2>
    <button onClick={onClickLogout}>Logout</button>
    <form className="formLogin" method="POST" onSubmit={onSubmit}>
      <fieldset>
        <legend>Login field</legend>
        {!isAuth ? 
        <>
        <label htmlFor="username">Username</label>
        <input type="text" id="userName" onChange={(e)=>onChangeUserName(e)} name="username"/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password"onChange={(e)=>onChangePwd(e)} name="pwd"/>
        <button type="submit">Login</button>  
        </>  
        :
        <p>aready login</p>
        }
        
      </fieldset>
    </form>
    </>
  )
}

export default Form;