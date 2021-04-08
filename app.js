// Imports
const express = require('express')
const session = require('express-session');
const mysql = require('mysql');
const fetch = require('node-fetch')
const app = express();
const port = 8080;

'use strict';
const sessionstorage = require('sessionstorage');


app.use(express.json());

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/php', express.static(__dirname + 'public/php'))
app.use('/views', express.static(__dirname + 'public/views'))
app.use('/database', express.static(__dirname + 'database'))

// Load Index Webpage
app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html')
})

 // Create Connection with MySql
 const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'CST2120_CW3'
})

// Connect to DB
db.connect((err) => {
  if(err) throw err
  console.log('Connected to the MySql Database, with the thread ID of:', db.threadId)
})

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Recieve data from user Registration
app.post('/register', function(req, res){

  let sql = 'INSERT INTO users SET ?' 
  let info = {
    username: req.body.username,
    email: req.body.password,
    password: req.body.email
  }
    
  db.query(sql , info, (err, results) => {
    if (err) {
      res.send(err);
      return console.error(err.message);
    }
    console.log('ID: [' + results.insertId + "]");
    res.send("Added");
  });

  db.end()
});

// login to website
app.post('/login', function(req, res){
  let username = req.body.username
  let password = req.body.password

  if (username && password) {
		db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
      if (err) throw err;
			if (results.length > 0 && sessionstorage.getItem('loggedIn') != 'true') {
        res.send('Logged in')
        sessionstorage.setItem('loggedIn', 'true')
        sessionstorage.setItem('username', username)
        res.end()
			} 
      else if (sessionstorage.getItem('loggedIn') == 'true'){
        res.send('User already Logged In')
        res.end()
			}		
      else {
        res.send('Incorrect Username and/or Password!');
        res.end()
      }	
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})

// logout from website
app.post('/logout', function(req, res){
  sessionstorage.clear()
}) 


// display chat posts
app.post('/chat', function(req, res){

  db.query('SELECT * FROM chat', function (err, results, fields) {
    if (err) {
      return console.log('Some sort of error with the code');
    }
    else if (!results.length) {                                                   
      return console.log('Empty Chat Table, returning back')
    } 

    let comments = [], user_id = []

    Object.keys(results).forEach(function(key) {
      var row = results[key];
      user_id.push(row.user_id)
      comments.push(row.comment)
    })
    

    db.query('SELECT * FROM users WHERE id IN (?)', [user_id], (err, result, field) => {
      if(err) throw err
      let username = []
      
      Object.keys(result).forEach(function(key) {
        var row = result[key];
        username.push(row.username)
      })

      var data = {
        usernameArr: username,
        commentsArr: comments
      }
      console.log(data)
      res.send(data)
    })
  })
})

// add comment to the chat DB
app.post('/addComment', function(req, res) {
  let comment = req.body.comment
  let username = req.body.username
  
  db.query('SELECT * FROM users WHERE username = ?', username, (err, result, field) => {
    if(err) throw err
    let user_id = result[0]['id']

    let info = {
      user_id: user_id,
      comment: comment
    }

    db.query('INSERT INTO chat SET ?', info, (err, results) => {
      if (err) {
        res.send(err);
        return console.error(err.message);
      }
      res.send("Added");
    });
  })
})

// purge chat
app.post('/purgeChat', function(req, res) {
  db.query('DELETE FROM chat')
})

// Listen on Port 8080
app.listen(port, () => console.info(`App listening on port ${port}`))