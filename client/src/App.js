import React,{useContext} from 'react';
import CtxRouter from './route/Router'
import {AuthProvider} from './context/AuthContext'



const App = () => {
  return (
    <>    
      <AuthProvider>
        <div className="App">
          <CtxRouter>

          </CtxRouter>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
