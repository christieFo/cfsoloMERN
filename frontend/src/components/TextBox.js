import React, { useState } from 'react';
import { Link } from "react-router-dom";

function TextBox()
{
    var storyContent;
    var count = 0;
    const [message,setMessage] = useState('');
    // const button = this.addStoryButton;
    // const [searchResults,setResults] = useState('');
    //const [cardList,setCardList] = useState('');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var user = ud.user;


    // if (_ud == null){
    //     // disable add button
    // }

    function countWords(str) {
        // return str.split(' ').length; // split() doesnt work, neither does replace
     }
    
    const addStory = async event => 
    {
	    event.preventDefault();

	    // alert('addStory() ' + storyContent.value);

        if(_ud == null){
            setMessage("Please Login or Register to save your work.");
        } 
        else{ // user data exists
            var obj = {user:user,story:storyContent.value, wordcnt:countWords(storyContent)};
            var js = JSON.stringify(obj);

            try
            {
                const response = await fetch('http://localhost:5000/api/addStory',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                var txt = await response.text();
                var res = JSON.parse(txt);

                if( res.error.length > 0 )
                {
                    setMessage( "API Error:" + res.error );
                }
                else
                {
                    setMessage('Story has been added');
                }
            }
            catch(e)
            {
                setMessage(e.toString());
            }
        }   
    };

    const doWrite = async event  =>
    {
        event.preventDefault();
        //alert("key pressed");
        count++;
        console.log("counter: " + count);
    }

    return (
    <div id="textUI">
        {/* text box */}
        <textarea onKeyUp={doWrite} rows={20} cols={50} id="content" 
            placeholder="&quot;Hello,&quot; he said. &quot;I heard you intend to write a story... Good luck.&quot;" 
            ref={ (c) => storyContent = c }></textarea>
        <br />
        
        <button type="button" id="addStoryButton" class="buttons" 
            onClick={addStory} > Add As New Story </button><br />  
        <span id="storyAddResult">{message}</span>
        {/* ref={ref => { addStoryButton = ref }} */}
    </div>
    );
};

export default TextBox;