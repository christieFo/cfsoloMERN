// import React from 'react';
import React, { useState } from 'react';
import TextBox from './TextBox';

function CardUI()
{
    var story = '';
    var search = '';

    const [message,setMessage] = useState('');
    // const [searchResults,setResults] = useState('');
    //const [cardList,setCardList] = useState('');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var username = ud.user;

    const addStory = async event => 
    {
	    event.preventDefault();

	    alert('addStory() ' + story.value);

    //     var obj = {userId:userId,story:story.value};
    //     var js = JSON.stringify(obj);

    //     try
    //     {
    //         const response = await fetch('http://localhost:5000/api/addStory',
    //         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

    //         var txt = await response.text();
    //         var res = JSON.parse(txt);

    //         if( res.error.length > 0 )
    //         {
    //             setMessage( "API Error:" + res.error );
    //         }
    //         else
    //         {
    //             setMessage('Story has been added');
    //         }
    //     }
    //     catch(e)
    //     {
    //         setMessage(e.toString());
    //     }

    };

    // const searchCard = async event => 
    // {
    //     event.preventDefault();
        
	//    alert('searchCard() ' + search.value);

    //    var obj = {userId:userId,search:search.value};
    //     var js = JSON.stringify(obj);

    //     try
    //     {
    //         const response = await fetch('http://localhost:5000/api/searchcards',
    //         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

    //         var txt = await response.text();
    //         var res = JSON.parse(txt);
    //         var _results = res.results;
    //         var resultText = '';
    //         for( var i=0; i<_results.length; i++ )
    //         {
    //             resultText += _results[i];
    //             if( i < _results.length - 1 )
    //             {
    //                 resultText += ', ';
    //             }
    //         }
    //         setResults('Card(s) have been retrieved');
    //         setCardList(resultText);
    //     }
    //     catch(e)
    //     {
    //         alert(e.toString());
    //         setResults(e.toString());
    //     }

    // };

    return(
      <div id="accessUIDiv">
       <br />
       {/* <input type="text" id="searchText" placeholder="Card To Search For" ref = {(C) => search = C} />
       <button type="button" id="searchCardButton" class="buttons" 
           onClick={searchCard}> Search Card </button><br /> 
       <span id="cardSearchResult">{searchResults}</span>*
       <p id="cardList">{cardList}</p><br /><br />
        <input type="text" id="Text" placeholder="Card To Add" ref={(c) => story = c} /> */}
       {/* <TextBox ref={(c) => story = c} /> */}
       <button type="button" id="addStoryButton" class="buttons" 
          onClick={addStory}> Save Story </button><br />
       <span id="storyAddResult">{message}</span>
     </div>
    );
}

export default CardUI;

