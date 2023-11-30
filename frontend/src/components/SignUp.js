// import React from 'react';
import React, { useState } from 'react';

function SignUp()
{
  var email;
  var username = "";
  var password;
  var passConf;

  const [message,setMessage] = useState('');


    const doSignUp = async event => 
    {
        event.preventDefault();

        alert('doIt() ' + email.value + ' ' + username.value + ' ' + password.value );
        var err = 0;
        //username = String(username);
        //console.log(typeof(username) + ' ' + username.length);
        // Test Fields
      //   if (!/[^@]+@[^@]+\.[^@]+/.test(email.value))
      // {
      //   err = 1;
      //   setMessage("Email Address format invalid.");
      // }
      if (username.length < 3)
      {
        err = 1;
        setMessage("Username must be 3 or more characters long.");
      }
      // if (!/\w*/.test(username.value))
      // {
      //   err = 1;
      //   setMessage("Username must contain only letters, digits, and underscores");
      // }
      // if (password.length < 8)
      // {
      //   err = 1;
      //   setMessage("Password must be at least 8 characters");
      // }
      // if (password !== passConf)
      // {
      //   err = 1;
      //   setMessage("Passwords do not match");
      // }
        
    //     var obj = {login:loginName.value,password:loginPassword.value};
    //     var js = JSON.stringify(obj);

    //     try
    //     {    
    //       const response = await fetch('http://localhost:5000/api/signUp',
    //           {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

    //         var res = JSON.parse(await response.text());

    //         if( res.id <= 0 )
    //         {
    //           setMessage('Email already in use.');
    //         }
    //         else
    //         {
    //           var user = {id:res.id, user:res.user}
    //           localStorage.setItem('user_data', JSON.stringify(user));

    //           setMessage('');
    //           window.location.href = '/cards';
    //         }
    //     }
    //     catch(e)
    //     {
    //       alert(e.toString());
    //       return;
    //     }    
    };

    return(
      <div id="signUpDiv">
        <a href='/'>I already have an account!</a>
        <form onSubmit={doSignUp}>
        <span id="inner-title">Create An Account:</span><br />
        
        <label htmlFor="email">Email:</label><br />
        <input type="text" id="email" placeholder="johnDoe@email.com" ref={(C) => email = C} /><br />

        <label htmlFor="username">Username:</label><br />
        <input type="text" id="username" placeholder="john1234" ref={(C) => username = C} /><br />

        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" placeholder="Password" ref={(C) => password = C} /><br />

        <label htmlFor="passConf">Confirm your Password:</label><br />
        <input type="text" id="passConf" placeholder="Password" ref={(C) => passConf = C} /><br />

        <span id="signUpResult">{message}</span>
        <input type="submit" id="signUpButton" value = "Sign Up" onClick={doSignUp} />
        <span id="signUpResult"></span>
        </form>
     </div>
    );
};

export default SignUp;
