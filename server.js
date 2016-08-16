var express = require('express')
var app = express()


app.set('port', (process.env.PORT || 8080))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', function (request, respond) {
    var loggedIn = request.query.loggedIn

    response.render('index', {loggedIn: loggedIn})
})

app.use(express.static(__dirname + '/public'))

app.listen(app.get('port'), function () {
    console.log('Listening to port 8080 !', app.get('port'))
})
