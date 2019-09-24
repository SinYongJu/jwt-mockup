import React,{useState,useContext} from 'react';
import {AuthContext} from '../context/AuthContext'
import {withRouter} from "react-router";
import {getList} from '../api/common'
import style from './Form.scss'

const Form = (props) =>{

  const {isAuth, authLogout , onSubmit} = useContext(AuthContext)
  const [userName, setUserName] = useState('lukas')
  const [pwd, setPwd] = useState('1234')

  const onChangeUserName = (e)=>{
    setUserName(e.target.value)
  }
  const onChangePwd = (e)=>{
    setPwd(e.target.value)
  }
  const onClickLogout = ()=>{
    getList(()=>{
      props.history.push('/')
    })
    console.log('click loggout')
    authLogout();
  }
  return (
    <>
    <h2>Login</h2>
    <button type="button" className="logout" onClick={onClickLogout}>Logout</button>
    <form className="formLogin" method="POST" onSubmit={(e) => onSubmit( e,{ name : userName , pwd } ,(data) => {
          console.log('go to home')
          props.history.push('/')
    })}>
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
        <p>already login</p>
        }
      </fieldset>
    </form>
    </>
  )
}

export default withRouter(Form);