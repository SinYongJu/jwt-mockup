import React from 'react';
import Header from './components/Header'
import Form from './components/Form'
import { BrowserRouter as Router, Route, Link ,Switch, Redirect } from "react-router-dom";

const Home = () => {
  return (<h2>Home</h2>)
}
const NotFound= () => {
  return (<h2>404 notFound</h2>)
}

const App = () => {
  let title = 'Home';
  let isAuth = false;
  
const PrivateRoute = ({component : Component, ...rest}) => {
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
    <div className="App">
       <Router>
          <Header>JWT-Mockup</Header>
          <div>
            <Switch>
              <PrivateRoute path="/" exact component={Home}></PrivateRoute>
              <Route path="/login" component={Form}></Route>
              <Route path="*" component={NotFound}></Route>
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
