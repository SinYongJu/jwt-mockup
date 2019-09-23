import React,{useContext} from 'react';
import CtxRouter from './route/Router'
import {AuthProvider} from './context/AuthContext'



const App = () => {
  return (
    <>    
    
    <AuthProvider>
      <CtxRouter>
        <div className="App">
    
        
        
        
        </div>
      </CtxRouter>
      </AuthProvider>
    
    </>
  );
}

export default App;
