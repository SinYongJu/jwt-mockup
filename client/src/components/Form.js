import React,{useState,useContext} from 'react';
import {AuthContext} from '../context/AuthContext'
import {withRouter} from "react-router";
import style from './Form.scss'

const Form = (props) =>{

  const {isAuth , onSubmit} = useContext(AuthContext)
  const [userName, setUserName] = useState('lukas')
  const [pwd, setPwd] = useState('1234')

  const onChangeUserName = (e)=>{
    setUserName(e.target.value)
  }
  const onChangePwd = (e)=>{
    setPwd(e.target.value)
  }
  return (
    <>
    <h2>Login</h2>
    
    <form className="formLogin" method="POST" onSubmit={(e) => onSubmit( e,{ name : userName , pwd})}>
      <fieldset>
        <legend>Login field</legend>
        {!isAuth ? 
        <>
        <label htmlFor="username">Username</label>
        <input type="text" id="userName" onChange={(e)=>onChangeUserName(e)} name="username"/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" autoComplete="new-password" onChange={(e)=>onChangePwd(e)} name="pwd"/>
        <button type="submit">Login</button>  
        </>  
        :
        <p>already login</p>
        }
      </fieldset>
    </form>
    </>
  )
}

export default withRouter(Form);