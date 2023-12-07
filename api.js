require('express');
require('mongodb');

exports.setApp = function (app, client)
{
    app.post('/api/addstory', async (req, res, next) =>
    {
      // incoming: username, story Content, wordcount, title
      // outgoing: error
        // var token = require('./createJWT.js');

        // const { user, story, wordcnt, jwtToken } = req.body;
         const { user, story, wordcnt } = req.body;


        // try{
        //     if( token.isExpired(jwtToken)){
        //         var r = {error:'The JWT is no longer valid', jwtToken: ''};
        //         res.status(200).json(r);
        //         return;

        //     }
        // }
        // catch(e){
        //     console.log(e.message);
        // }
        
        const newStory = {story:story,owner:user, word_cnt:wordcnt, title:title};
        var error = '';
        
        try
        {
            const db = client.db("maindb");
            const result = db.collection('stories').insertOne(newStory);
        }
        catch(e)
        {
            error = e.toString();
        }

        //cardList.push( card );

        // var refreshedToken = null;
        // try
        // {
        //     refreshedToken = token.refresh(jwtToken);
        // }
        // catch(e)
        // {
        //     console.log(e.message);
        // }
        
        // var ret = { error: error, jwtToken: refreshedToken };
        // res.status(200).json(ret);

        var ret = { error: error };
        res.status(200).json(ret);
    });


    app.post('/api/login', async (req, res, next) => 
    {
      // incoming: login, password
      // outgoing: id, user, error
        
     var error = '';

      const { login, pass } = req.body;

      const db = client.db('maindb');
      const results = await db.collection('users').find({email:login.toLowerCase(),Pass:pass}).toArray();

      var id = -1;
      var un = '';
      var ver = false;

      var ret;

      if( results.length > 0 )
      {
        id = results[0].UserID;
        un = results[0].user;
        ver = results[0].verified;
        
        // if(!ver){
        //     ret = {error:"Need to Verify Email first."};
        //     // try{
        //     //     const token = require("./createJWT.js");
        //     //     ret = token.createToken(id, un);
        //     // }
        //     // catch(e){
        //     //     ret = {error:e.message};
        //     // }
        // }
      }
        // else{
        //     ret = {error:"Login/Password incorrect"};
        // }
        
        //  var ret = { id:id, firstName:fn, lastName:ln, error:''};
          var ret = { id:id, user:un, verified:ver, error:''};
        res.status(200).json(ret);
    });

    app.post('/api/signup', async (req, res, next) =>
    {
        var error = '';
        const { email, user, pass } = req.body;

        const db = client.db("maindb");
        const emailCheck = await db.collection('users').find({email:email}).toArray();
        
        if (emailCheck.length > 0)
            res.status(201).json({error:'Email already in use'});
        else
        {
            const userCheck = await db.collection('users').find({user:user}).toArray();
            if (userCheck.length > 0)
                res.status(202).json({error:'Username already in use'});
            else
            {
                await db.collection('users').insertOne({"email":email, "user":user, "pass":pass, "verified":false});
                res.status(200).json({error:''});
            }
        }
    });

    app.post('/api/searchcards', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error

      var error = '';

    //   const { user, search, jwtToken } = req.body;

    //   try{
    //       if( token.isExpired(jwtToken)){
    //           var r = {error:'The JWT is no longer valid', jwtToken: ''};
    //           res.status(200).json(r);
    //           return;

    //       }
    //   }
    //   catch(e){
    //       console.log(e.message);
    //   }

      const { userId, search } = req.body;
    
      // var _search = search.toLowerCase().trim();
      // var _ret = [];

      // for( var i=0; i<cardList.length; i++ )
      // {
      //   var lowerFromList = cardList[i].toLocaleLowerCase();
      //   if( lowerFromList.indexOf( _search ) >= 0 )
      //   {
      //     _ret.push( cardList[i] );
      //   }
      // }
      var _search = search.trim();
    
      const db = client.db("maindb");
      const results = await db.collection('stories').find({"title":{$regex:_search+'.*', $options:'r'}}).toArray();
    
      var _ret = [];
      for( var i=0; i<results.length; i++ )
      {
        _ret.push( results[i].Card );
      }


    //   var refreshedToken = null;
    //   try
    //   {
    //     refreshedToken = token.refresh(jwtToken);
    //   }
    //   catch(e)
    //   {
    //     console.log(e.message);
    //   }
    
    //   var ret = { results:_ret, error: error, jwtToken: refreshedToken };

      var ret = {results:_ret, error:''};
      res.status(200).json(ret);
    });
}