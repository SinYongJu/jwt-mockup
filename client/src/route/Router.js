
import React from 'react';
import Header from '../components/Header'
import Form from '../components/Form'
import List from '../components/List';
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import PrivateRoute from './PrivateRoute'
import {AuthProvider} from '../context/AuthContext'


const Home = () => {
  return (<h2>Home</h2>)
}
const NotFound= () => {
  return (<h2>* 404 notFound</h2>)
}
const Private = () => {
  return (<h2>Private</h2>)
}


const CtxRouter = () => {
  return (
    <Router>      
      <AuthProvider>      
        <Header>JWT-Mockup</Header>
        <div className="contents">
        <Switch>
          <PrivateRoute path="/private" exact component={Private}></PrivateRoute>
          <PrivateRoute path="/List" component={List}></PrivateRoute>
          <Route path="/login" component={Form}></Route>
          <Route path="/" exact component={Home}></Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
        </div>
      </AuthProvider>  
    </Router>
  )
}

export default CtxRouter;
