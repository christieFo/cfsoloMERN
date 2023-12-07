// import React from 'react';
import React, { useState } from 'react';
// import { useJwt } from "react-jwt";
// import axios from 'axios';

function Login()
{
  // var bp = require('./Path.js');
  // var storage = require('../tokenStorage.js');
  
  var loginName;
  var loginPassword;

  const [message,setMessage] = useState('');

  // const app_name = 'solo-mern';
  // function buildPath(route)
  // {
  //     if (process.env.NODE_ENV === 'production') 
  //     {
  //         return 'https://' + app_name +  '.herokuapp.com/' + route;
  //     }
  //     else
  //     {        
  //         return 'http://localhost:5000/' + route;
  //     }
  // };

    const doLogin = async event => 
    {
        event.preventDefault();

        // alert('doIt() ' + loginName.value + ' ' + loginPassword.value );
        
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
        const response = await fetch('http://localhost:5000/api/login',
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        // const response = await fetch(buildPath('api/login'),
        //     {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          // const response = await fetch(bp.buildPath('api/login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          var res = JSON.parse(await response.text());
          console.log("res: " + res.id + " " + res.user + " " + res.verified);
          if( res.id <= 0 )
          {
            setMessage('User/Password combination incorrect');
          }
          else if(res.verified == false){
            setMessage('Verify Email First');
          }
          else
          {
            var user = {id:res.id, user:res.user}
            localStorage.setItem('user_data', JSON.stringify(user));

            setMessage('');
            window.location.href = '/text';
          }
        }
        catch(e)
        {
          alert(e.toString());
          return;
        }    
    };

    


    return(
      <div id="loginDiv">
        <span id="inner-title">Log In:</span><br />
        <form onSubmit={doLogin}>
          
          <label htmlFor="loginName">Email:</label><br />
          <input type="text" id="loginName" placeholder="johnDoe@email.com" ref={(C) => loginName = C} /><br />

          <label htmlFor="password">Password:</label><br />
          <input type="password" id="loginPassword" placeholder="Password" ref={(C) => loginPassword = C} /><br />

          <span id="loginResult">{message}</span>
          <input type="submit" id="loginButton" value = "Login"
            onClick={doLogin} />
        </form>
        <span id="loginResult"></span>
        <a href='/signUp'>Click here to create an Account</a>
     </div>
    );
};

export default Login;
