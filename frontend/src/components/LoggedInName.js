import React from 'react';

function LoggedInName()
{
	
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var user = ud.user;
    // var user = JSON.parse(_ud).user;
    // var lastName = ud.lastName;

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };    

  return(
   <div id="loggedInDiv">
   <span id="userName">Logged In As {user} </span>
   <button type="button" id="logoutButton"
     onClick={doLogout}> Log Out </button>
   </div>
  );

};


export default LoggedInName;
