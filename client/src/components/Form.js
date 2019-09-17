import React from 'react';


const Form = ({children}) =>{

  return (<form>
    <fieldset>
      <legend>{children} field</legend>
       <label htmlFor="username">Username</label>
       <input type="text" id="userName" name="username"/>
       <label htmlFor="password">Password</label>
       <input type="password" id="password" name="pwd"/>
    </fieldset>
  </form>)
}

export default Form;