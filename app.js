// Imports
const express = require('express')
const mysql = require('mysql');
const app = express()
const port = 8080

// Listen on Port 8080
app.listen(port, () => console.info(`App listening on port ${port}`))

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/views', express.static(__dirname + 'public/views'))

// Load Index Webpage
app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html')
 })

 // Create Connection with MySql
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123',
  database : 'CST2120_CW3'
})

// Connect to DB
db.connect((err) => {
  if(err){
    throw err
  }
  console.log('Connected to the MySql Database')
})