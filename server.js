const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


//   ch683636    O3xG9DobcwWt9B8m
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://ch683636:O3xG9DobcwWt9B8m@cluster0.dxwbfh6.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(url);
client.connect();


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

app.listen(5000); // start Node + Express server on port 5000

app.post('/api/addstory', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
	
  const { user, story, wordcnt } = req.body;

  const newStory = {story:story,owner:user, word_cnt:wordcnt};
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

  var ret = { error: error };
  res.status(200).json(ret);
});


app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, user, error
	
 var error = '';

  const { login, pass } = req.body;

  const db = client.db("maindb");
  const results = await db.collection('users').find({email:login.toLowerCase(),Pass:pass}).toArray();

  var id = -1;
  var un = '';
  var ln = '';

  if( results.length > 0 )
  {
    id = results[0].UserID;
    un = results[0].user;
    // ln = results[0].LastName;
  }

  //  var ret = { id:id, firstName:fn, lastName:ln, error:''};
  var ret = { id:id, user:un, error:''};
  res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

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
  
  const db = client.db();
  const results = await db.collection('users').find({"email":{$regex:_search+'.*', $options:'r'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }


  var ret = {results:_ret, error:''};
  res.status(200).json(ret);
});
