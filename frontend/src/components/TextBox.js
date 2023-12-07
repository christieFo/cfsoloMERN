import React, { useState, useEffect } from 'react';
// import { useJwt } from "react-jwt";
// import axios from 'axios';
// import { Link } from "react-router-dom";

function TextBox({health, setHealth, maxHealth, enemyHealth, setEnemyHealth, maxEnemyHealth, setMaxEnemy})
{
    // var bp = require('./Path.js');
    // var storage = require('../tokenStorage.js');

    var storyContent;
    var storyTitle;
    var storyID;
    var newEnemyHealth;
    
    const [attackedInterval, setAttackInterval] = React.useState(1000);
    const [pause, setPause] = useState(true);
    const [message,setMessage] = useState('');
    const [battleFinished, setFinished] = useState(false); // health <= 0 || enemyHealth <= 0

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


    // monster is attacking the player every [interval]
    useEffect(() => {
 
        if(health > 0 && enemyHealth > 0){
            var interval = setInterval(() => {
                if(!pause){
                    setHealth((health) => health - 5);
                    console.log("health: " + health);
                }
            }, attackedInterval);
        }
        return () => clearTimeout(interval);
    });
    

    // word counter
    const [state, setState] = React.useState({
        wordCount: 0, 
        charCount: 0
    });
      
    const handleKeyPress = (e) => {
        // gets textarea
        const count = e.target.value;
        
        const countWords = (count) => {
            if (count.length === 0) {
                return 0;
            } else {
                count = count.replace(/(^\s*)|(\s*$)/gi,"");
                count = count.replace(/[ ]{2,}/gi," ");
                count = count.replace(/\n /,"\n");
                return count.split(' ').length; 
            }
        }
        
        setState({
            wordCount: countWords(count),
            charCount: count.length
        });

        // key press automatically continues game
        if(pause){
            setPause(false);
            // console.log("unpaused.");
        }

        healthChange(e);
    }
    
    // saves document as a new database entry
    const saveStory = async event => 
    {
	    event.preventDefault();

	    // alert('saveStory() ' + storyContent.value + " " + storyTitle.value);
        if(state.charCount === 0){
            setPause(true);
            setMessage("Really? An empty document?");
        }
        else if(document.getElementById("title").value === ""){
            setPause(true);
            setMessage("Please Add a Title.");
        } 
        else{
            // var storage = require('../tokenStorage.js');
            var obj = {user:user, story:storyContent.value, wordcnt:state.wordCount, title:storyTitle.value };
            var js = JSON.stringify(obj);

            try
            {
                // need to find original title in db before adding
                const response = await fetch('http://localhost:5000/api/addStory',
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        
                // const response = await fetch(buildPath('api/addStory'),
                // {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
                // const response = await fetch(bp.buildPath('api/login'), 
                //     {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
      
                var txt = await response.text();
                var res = JSON.parse(txt);

                if( res.error.length > 0 )
                {
                    setMessage( "API Error:" + res.error );
                }
                else
                {
                    setMessage('Story has been added');
                    // storage.storeToken( res.jwtToken );
                }
            }
            catch(e)
            {
                setMessage(e.toString());
            }
        }   
    };

    // words in textarea affect the health bars
    const healthChange = (e) => {
        if(health <= 0 || enemyHealth <= 0){
            console.log("battle finish!");
            setFinished(true);
        }
        // enenmy health goes down every word written
        if(!pause && !battleFinished){
            console.log("attacked enemy!");
            setEnemyHealth(maxEnemyHealth - state.wordCount);
        }

        // health added every couple words - keeps those words flowing!
        if(!pause && !battleFinished && health < maxHealth && state.wordCount > 0 && !(e.key === " " || e.key === "Enter") && state.charCount % 10 === 0){
            console.log("health added!");
            setHealth((health) => health + 10);
        }

    }

    // pause button pressed
    const pauseToggle = () => {
        // console.log("pause toggled");
        pause ? setPause(false): setPause(true);
    }

    const setNewGame = () => {
        setPause(true);
        document.getElementById("content").disabled = true;

        if(storyContent.value !== ""){
            document.getElementById("saveQuestion").style.display = 'block'; 
        } 
        else{
            clearFields();
            document.getElementById("wordCountGoal").style.display = 'block';
        }
        console.log("new Story");
    }

    const newGameSave = () => {
        console.log("newGameSave()");
        setPause(true);
        if(storyTitle.value === ""){
            document.getElementById("saveAsk").style.display = 'none';
            document.getElementById("titleSave").style.display = 'block';
        } else{
            saveStory();
            document.getElementById("wordCountGoal").style.display = 'block';
        }
    }
    
    const clearFields = () => {
        setPause(true);
        //clear popup
        document.getElementById("saveQuestion").style.display = 'none';
        document.getElementById("saveAsk").style.display = 'block';
        document.getElementById("titleSave").style.display = 'none';

        //rest values
        storyContent.value = "";
        storyTitle.value = "";
        setHealth(maxHealth);
        setEnemyHealth(maxEnemyHealth);
        document.getElementById("wordCountGoal").style.display = 'block';
    }

    const setNewWordCount = () => {
        var newEH = Number(newEnemyHealth.value);
        
        if(!newEH.isNaN && newEH > 1){
            document.getElementById("wordCountGoal").style.display = 'none';

            // set new game values
            setEnemyHealth(newEH);
            setMaxEnemy(newEH);
            
            document.getElementById("content").disabled = false;
        } else {
            newEnemyHealth.placeholder = "Not a valid number"
            newEnemyHealth.value = "";
        }
    }

    const viewWorks =  event => {
        event.preventDefault();
        window.location.href = "/viewWorks";
    }
    function adjust() {
        var txt = document.querySelector("textarea");
        // txt.style.width = "70%";
        txt.style.height = "60%";
      }

    return (
    <div id="textUI">
        <div>
            <span id="pauseButton" onClick={pauseToggle}> &#9616;&#9616;</span>

            <div id="saveQuestion" style={{display:"none"}} >
                <div id="saveAsk">
                    Would you like to save your story?<br />
                    <button id="saveYes" onClick={newGameSave}>Yes</button><button id="saveNo" onClick={clearFields}>No</button>
                </div>
                <form id="titleSave"  style={{display:"none"}} onSubmit={saveStory}>
                    Please add a Title <br />
                    <input placeholder="Title" ref={ (c) => storyTitle = c }></input><br />
                    <button type="submit" id="saveTitle" onClick={saveStory}>Save Story + Create New Game</button><button id="noSaveTitle"onClick={clearFields}>Changed My Mind. Do Not Save Story</button>
                </form>
            </div>
            <div id="wordCountGoal" style={{display:'none'}}>
                What is your Word Count Goal?<br />
                <input id="goalInput" ref={ (c) => newEnemyHealth = c} ></input>
                <button id="setGoalButton" type="button" onClick={setNewWordCount} >Set Goal</button>
            </div>

            {/* title */}
            <label htmlFor="title">Title: </label>
            <input id="title" placeholder="The Fall of Victorious" 
            ref={ (c) => storyTitle = c }></input><br />

            {/* text box */}
            <textarea onChange={handleKeyPress} onLoad={adjust} rows={20} cols={50} id="content" 
                placeholder="&quot;Hello,&quot; he said. &quot;I heard you intend to write a story... Good luck.&quot;" 
                ref={ (c) => storyContent = c }></textarea>
            <br />
            <span id="counters" >words: {state.wordCount} characters: {state.charCount}</span>
        </div>

        <div>
            <button type="button" id="newGameButton" 
                onClick={setNewGame}>
                New Game/Story
            </button>
            <button type="button" id="saveStoryButton" 
                onClick={saveStory} > Save Story </button>
            <button id="pastWorksButton" onClick={viewWorks} >View Past Works</button><br />
            {/* <button type="button" id="addStoryButton" 
                onClick={addStory} > Add As New Story </button> */}
            <span id="storyAddResult">{message}</span>
        </div>
    </div>
    );
};

export default TextBox;