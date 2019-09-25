import React from 'react';
import Title from './Title'
import { Link } from 'react-router-dom'
import {withRouter} from "react-router";
import {AuthContext} from '../context/AuthContext'
import style from './Header.scss'

const Header = (props)=>{
  const {children, location} = props
  const {isAuth,authLogoutHandler} = React.useContext(AuthContext)
  // render(){
  //   const {history,location ,children} = this.props
  //   console.log(this.props)
  //   console.log(location)
    const onClickHandler = ()=> {
      console.log('click loggout')
      authLogoutHandler()
    }
    return (
      <header>
        <Title>{children}</Title>
        <button type="button" className="logout" disabled={!isAuth} onClick={onClickHandler}>Logout</button>
        <div className="nav">
          <strong>you are in {location.pathname}</strong>
          <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/private">private</Link></li>
            <li><Link to="/List">List</Link></li>
          </ul>
        </div>
      </header>
    )
  // /}
}

export default withRouter(Header)