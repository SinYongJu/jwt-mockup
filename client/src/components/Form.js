import React,{useState,useContext} from 'react';
import {AuthContext} from '../context/AuthContext'
import {login} from '../api/auth'
import style from './Form.scss'

const Form = (props) =>{
  const {isAuth,settingToken,removeToken} = useContext(AuthContext)
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
      login(body).then(
        (data) => {
          console.log(data)
          settingToken(data.accessToken)// 토큰 저장        
          props.history.push('/') // home 진입  
        }
      ).catch(errorHandler)
    
  }

  const onClickLogout = ()=>{
    console.log('click')
    removeToken();
  }

  return (
    <>
    <h2>Login</h2>
    <button type="button" className="logout" onClick={onClickLogout}>Logout</button>
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
        <p>already login</p>
        }
        
      </fieldset>
    </form>
    </>
  )
}

export default Form;