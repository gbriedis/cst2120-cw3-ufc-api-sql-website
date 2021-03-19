// Imports
const express = require('express')
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

app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html')
 })