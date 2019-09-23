import React from 'react';
import Title from './Title'
import { Link } from 'react-router-dom'
import {withRouter} from "react-router";
import style from './Header.scss'

const Header = (props)=>{
  const {children, location} = props
  console.log(props)
  // render(){
  //   const {history,location ,children} = this.props
  //   console.log(this.props)
  //   console.log(location)
    return (
      <header>
        <Title>{children}</Title>
        <strong>you are in {location.pathname}</strong>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/login">login</Link></li>
          <li><Link to="/private">private</Link></li>
          <li><Link to="/verify">verify</Link></li>
        </ul>
      </header>
    )
  // /}
}

export default withRouter(Header)