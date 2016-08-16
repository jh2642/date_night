var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(8080, function () {
    console.log('Listening to port 8080 !')
})
