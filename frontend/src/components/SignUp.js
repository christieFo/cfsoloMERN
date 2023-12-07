// import React from 'react';
import React, { useState } from 'react';
// import { useJwt } from "react-jwt";
// import axios from 'axios';

function SignUp()
{
  // var bp = require('./Path.js');
  // var storage = require('../tokenStorage.js');

  var email;
  var username;
  var password;
  var passConf;
  var err;

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

    const doSignUp = async event => 
    {
      event.preventDefault();
      
      var obj = {email:email.value, user:username.value, pass:password.value};
      var js = JSON.stringify(obj);

      // username = JSON.stringify(username);
      console.log('doSignUp() ' + email.value + ' ' + username.value + ' ' + String(password.value) + ' ' + String(passConf.value));
      // var err = 0;
      // alert('signUp() ' + obj.username.length);

      err = 0;

      passConfirmTest();
      passwordTest();
      userTest();
      emailTest();

      // console.log(err);

      if(err === 0){
        try
        {    
          const response = await fetch('http://localhost:5000/api/signup',
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
  
          // const response = await fetch(buildPath'api/signup',
          //     {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          // var bp = require('./Path.js');
          // const response = await fetch(bp.buildPath('api/signup'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          var res = JSON.parse(await response.text());

          if( res.error != "" )
          {
            setMessage(res.error);
          }
          else{
          
            //nodemailer
            var user = {id:res.id, user:res.user}
            localStorage.setItem('user_data', JSON.stringify(user));

            setMessage('');
            window.location.href = '/';
          }
        }
        catch(e)
        {
          alert(e.toString());
          return;
        }    
      }
    };
    
    const emailTest = () =>
    {
      // event.preventDefault();
      var obj = {email:email.value};
      var js = JSON.stringify(obj);

      var emailElem = document.getElementById("email");
      // Test Fields
        if (!/[^@]+@[^@]+\.[^@]+/.test(obj.email))
      {
        err = 1;
        emailElem.style.background = "tomato";
        setMessage("Email Address format invalid.");
      } else{
        emailElem.style.background = "white";
        setMessage("");
      }
    }

    const userTest = () => {
      console.log("usertest");
      var obj = {username:username.value};
      var js = JSON.stringify(obj);

      var userElem = document.getElementById("username");
      // if (username.length < 3)
      // {
      //   err = 1;
      //   setMessage("Username must be 3 or more characters long.");
      // }
      if (!/\w+/.test(obj.username))
      {
        // alert("usertest");
        err = 2;
        setMessage("Usernames must have letters, digits, and underscores");
        userElem.style.background = "tomato";
      }else{
        userElem.style.background = "white";
        setMessage("");
      }
    }

    const passwordTest = () => 
    {
      var obj = {password:password.value};
      // var js = JSON.stringify(obj);

      var passElem = document.getElementById("password");

      if (obj.password.length < 8)
      {
        err = 3;
        passElem.style.background = "tomato";
        setMessage("Password must be at least 8 characters");
      } else{
        passElem.style.background = "white";
        setMessage("");
      }
    }

    const passConfirmTest = () => {
      var obj = {password:password.value, passConf:passConf.value};
      // var js = JSON.stringify(obj);

      // var passElem = document.getElementById("password");
      var confElem = document.getElementById("passConf");

      if (obj.password !== obj.passConf)
      {
        err = 4;
        // passElem.style.background = "tomato";
        confElem.style.background = "tomato";
        setMessage("Passwords need to match");
        // document.getElementById("password").style.background  = "tomato";
        // document.getElementById("passConf").style.background = "tomato";
      } else {
        // passElem.style.background = "white";
        confElem.style.background = "white";
        setMessage("");
      }
    }

    const focusIn = function() 
    {
      document.activeElement.style.background = "#CCFFFF";
    }

    return(
      <div id="signUpDiv">
        <a href='/'>I already have an account!</a>
        <form onSubmit={doSignUp} onFocus={focusIn}>
        <span id="inner-title">Create An Account:</span><br />
        
        <label htmlFor="email">Email:</label><br />
        <input type="text" id="email" placeholder="johnDoe@email.com" 
        onBlur={emailTest} ref={(C) => email = C} /><br />

        <label htmlFor="username">Username:</label><br />
        <input type="text" id="username" placeholder="john1234" 
        onBlur={userTest} ref={(C) => username = C} /><br />

        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" placeholder="Password" 
        onBlur={passwordTest} ref={(C) => password = C} /><br />

        <label htmlFor="passConf">Confirm your Password:</label><br />
        <input type="password" id="passConf" placeholder="Password" 
        onBlur={passConfirmTest} ref={(C) => passConf = C} /><br />

        <span id="signUpResult">{message}</span><br />
        <input type="submit" id="signUpButton" value = "Sign Up" onClick={doSignUp} />
        <span id="signUpResult"></span>
        </form>
     </div>
    );
};

export default SignUp;
