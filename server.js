var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(80, function () {
    console.log('Listening to port 80 !')
})
