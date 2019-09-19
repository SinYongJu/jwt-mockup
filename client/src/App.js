import React,{useContext} from 'react';
import Header from './components/Header'
import Form from './components/Form'
import {FormContext,FormProvider} from './context/FormContext'
import { BrowserRouter as Router, Route ,Switch, Redirect } from "react-router-dom";

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
    const {isAuth,isLogined} = useContext(FormContext)
    isLogined()
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
  <FormProvider>
    <div className="App">
       <Router>
          <Header>JWT-Mockup</Header>
          <div>
            <Switch>
              <PrivateRoute path="/" exact component={Home}></PrivateRoute>
              <PrivateRoute path="/private" exact component={Private}></PrivateRoute>
              <Route path="/login" component={Form}></Route>
              <Route path="*" component={NotFound}></Route>
            </Switch>
          </div>
      </Router>
    </div>
    </FormProvider>
    </>
  );
}

export default App;
