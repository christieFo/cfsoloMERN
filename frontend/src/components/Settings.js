import React, { useState, useEffect, Component } from 'react';
// import axios from 'axios';

function Settings() {


    const [results, setResults] = React.useState([]);
    
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var user = ud.user;
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
    // var bp = require('./Path.js');
    //       const response = await fetch(bp.buildPath('api/login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

    // useEffect();

    const viewWorks = async event => {
        event.preventDefault();
        alert("test");
        var obj = {user:user};
        var js = JSON.stringify(obj);
    
        try
        {
        const response = await fetch("http://localhost:5000/api/searchstories", {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());

        // var txt = await response.text();
        // var res = JSON.parse(txt);

        var _results = res.results;
        var resultTitle = '<span>';
        var resultText = '';
        var resultTotal = '';
        for( var i=0; i<_results.length; i++ )
        {
            resultTitle = _results[i].Tresults;
            resultText = _results[i].Cresults;
            resultTotal += resultTitle + '<br>' + resultText;
            if( i < _results.length - 1 )
            {
                resultTotal += '</span><br>';
            }
        }
        //setResults('Work(s) have been retrieved');
        setResults(resultTotal);

        } 
        catch(e)
        {
        alert(e.toString());
        }
    }

    const goBack = () => {
        window.location.href="/text";
    }

    return(
        <div onLoad={viewWorks}>
            <button id="backButton" onClick={goBack} value="Go Back">Go Back</button>
            <div id="workList" >{results}</div>
        </div>
    );
};

export default Settings;