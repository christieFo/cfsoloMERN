// import React from 'react';
import React, { useState } from 'react';

function Login()
{
  var loginName;
  var loginPassword;

  const [message,setMessage] = useState('');


    const doLogin = async event => 
    {
        event.preventDefault();

        //alert('doIt() ' + loginName.value + ' ' + loginPassword.value );
        
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
          const response = await fetch('http://localhost:5000/api/login',
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
              setMessage('User/Password combination incorrect');
            }
            else
            {
              var user = {id:res.id, user:res.user}
              localStorage.setItem('user_data', JSON.stringify(user));

              setMessage('');
              window.location.href = '/cards';
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
        <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span><br />
        <label for="loginName">Email:</label><br />
        <input type="text" id="loginName" placeholder="johnDoe@email.com" ref={(C) => loginName = C} /><br />
        <label for="password">Password:</label><br />
        <input type="password" id="loginPassword" placeholder="Password" ref={(C) => loginPassword = C} /><br />
        <span id="loginResult">{message}</span>
        <input type="submit" id="loginButton" class="buttons" value = "Do It"
          onClick={doLogin} />
        </form>
        <span id="loginResult"></span>
     </div>
    );
};

export default Login;
