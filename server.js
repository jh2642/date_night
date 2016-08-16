var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 8080))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(app.get('port'), function () {
    console.log('Listening to port 8080 !', app.get('port'))
})
