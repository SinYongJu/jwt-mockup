
 import React,{useContext} from 'react';
 import {AuthContext} from '../context/AuthContext'
 import {Route, Redirect} from "react-router-dom";

 const PrivateRoute = ({component : Component, ...rest}) => {
  const {isAuth,isExpiredToken} = useContext(AuthContext)
  isExpiredToken()
    return (
      <Route
      {...rest}
      render ={ (props) => {
        return isAuth ? <Component {...props}></Component> : <Redirect to={{ pathname: "/login", state: { from: props.location }}}/>
      }
      }>  
      </Route>
    )
}

export default PrivateRoute;