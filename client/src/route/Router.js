
import React,{useContext} from 'react';
import Header from '../components/Header'
import Form from '../components/Form'
import Verify from '../components/Verify';
import {AuthContext} from '../context/AuthContext'
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import PrivateRoute from './PrivateRoute'


const Home = () => {
  return (<h2>Home</h2>)
}
const NotFound= () => {
  return (<h2>404 notFound</h2>)
}
const Private = () => {
  return (<h2>Private</h2>)
}


const CtxRouter = () => {
  return (
    <Router>        
      <Header>JWT-Mockup</Header>
      <Switch>
        <PrivateRoute path="/private" exact component={Private}></PrivateRoute>
        <PrivateRoute path="/verify" component={Verify}></PrivateRoute>
        <Route path="/login" component={Form}></Route>
        <Route path="/" exact component={Home}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default CtxRouter;
