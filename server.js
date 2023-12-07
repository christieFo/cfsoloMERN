const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// heroku before 'const app = express();'
// const path = require('path');           
// const PORT = process.env.PORT || 5000;  

const app = express();

// heroku after 'const app = express();'
// app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());


//   ch683636    O3xG9DobcwWt9B8m
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://ch683636:O3xG9DobcwWt9B8m@cluster0.dxwbfh6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();
// require('dotenv').config();
// const url = process.env.MONGODB_URI;
// const MongoClient = require('mongodb').MongoClient; // you might already have this.
// const client = new MongoClient(url);
// client.connect();

// var api = require('./api.js');
// api.setApp( app, client );

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});
// const nodemailer = require('nodemailer');
// let transporter = nodemailer.createTransport(transport[, defaults])

// let mailTransporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth:{
//         user: 'pdi81759@nezid.com'//"c20261979@gmail.com",
//         // pass: "ucf2023-24"
//     }
// });
app.listen(5000); // start Node + Express server on port 5000
// v
// app.listen(PORT, () => 
// {
//   console.log('Server listening on port ' + PORT);
// });

///////////////////////////////////////////////////
// For Heroku deployment

// Server static assets if in production
// if (process.env.NODE_ENV === 'production') 
// {
//   // Set static folder
//   app.use(express.static('frontend/build'));

//   app.get('*', (req, res) => 
//  {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//   });
// }


app.post('/api/addstory', async (req, res, next) =>
{
  // incoming: username, story Content, wordcount, title
  // outgoing: error
	
  const { user, story, wordcnt, title } = req.body;

  const newStory = {owner:user, story:story, word_cnt:wordcnt, title:title};
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

  if( results.length > 0 )
  {
    id = results[0].UserID;
    un = results[0].user;
    ver = results[0].verified;

    // ln = results[0].LastName;
  }

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
              // const verificationToken = email + user;
              await db.collection('users').insertOne({"email":email, "user":user, "pass":pass, "verified":true});
              // const url = `http://localhost:3000/api/verify/${verificationToken}`

              // mailTransporter.sendMail({
              //   to: email,
              //   subject: 'Verify account',
              //   html: `Click <a href = '${url}'>here</a> to confirm your email.`
              // })
              res.status(200).json({error:''});
            }
            
        }
    });

app.post('/api/searchstories', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { user } = req.body;
  
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
  // var _search = search.trim();
  
  const db = client.db("maindb");
  const results = await db.collection('stories').find({"user":user}).toArray();
  
  var Tret = [];
  var Cret = [];
  for( var i=0; i<results.length; i++ )
  {
    Tret.push( results[i].title );
    Cret.push( results[i].story);
  }


  var ret = {Tresults:Tret, Cresults:Cret, error:''};
  res.status(200).json(ret);
});
