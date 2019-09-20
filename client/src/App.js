import React,{useContext} from 'react';
import Header from './components/Header'
import Form from './components/Form'
import {AuthContext,AuthProvider} from './context/AuthContext'
import { BrowserRouter as Router, Route ,Switch, Redirect } from "react-router-dom";
import Verify from './components/Verify';

const Home = () => {
  return (<h2>Home</h2>)
}
const NotFound= () => {
  return (<h2>404 notFound</h2>)
}
const Private = () => {
  return (<h2>Private</h2>)
}

const App = () => {
  const PrivateRoute = ({component : Component, ...rest}) => {
    const {isAuth,isLogin} = useContext(AuthContext)
    isLogin()
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
  return (
    <>
  <AuthProvider>
    <div className="App">
       <Router>
          <Header>JWT-Mockup</Header>
          <Verify></Verify>  
          <Switch>
            <PrivateRoute path="/" exact component={Home}></PrivateRoute>
            <PrivateRoute path="/private" exact component={Private}></PrivateRoute>
            <Route path="/login" component={Form}></Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
      </Router>
    </div>
    </AuthProvider>
    </>
  );
}

export default App;
