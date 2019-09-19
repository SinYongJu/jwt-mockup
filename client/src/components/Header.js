import React from 'react';
import Title from './Title'
import { Link } from 'react-router-dom'
import style from './Header.scss'

const Header = ({children}) => {
  return (
  <header>
     <Title>{children}</Title>
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/login">login</Link></li>
        <li><Link to="/private">private</Link></li>
      </ul>
  </header>)
}

export default Header;