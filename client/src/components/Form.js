import React,{useState,useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import style from './Form.scss'

const AUTH = 'http://localhost:8080/auth';

const Form = (props, { children}) =>{
  const [userName, setUserName] = useState('')
  const [pwd, setPwd] = useState('')
  
  const onChangeUserName = (e)=>{
    setUserName(e.target.value)
  }

  const onChangePwd = (e)=>{
    setPwd(e.target.value)
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify({data: 'datass'})
    fetch('http://127.0.0.1:8080/auth',
        { method : 'POST',mnode : 'cors', body: data,
        headers :{'Content-Type': 'application/json'}}).then((res)=>{console.log(res)})
    //props.history.push('/') // home 진입
  }

  useEffect(()=>{
    
    const onChangeUserName = (e)=>{
      setUserName(e.target.name)
    }

    const onChangePwd = (e)=>{
      setPwd(e.target.value)
    }
    
  },[userName,pwd])
  
  return (
    <>
    <h2>Login</h2>
    <form className="formLogin" method="POST" onSubmit={onSubmit}>
      <fieldset>
        <legend>Login field</legend>
        <label htmlFor="username">Username</label>
        <input type="text" id="userName" onChange={(e)=>onChangeUserName(e)} name="username"/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password"onChange={(e)=>onChangePwd(e)} name="pwd"/>
        <button type="submit">Login</button>
      </fieldset>
    </form>
    </>
  )
}

export default Form;