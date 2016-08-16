var express = require('express')
var ejs = require('ejs')
var app = express()


app.set('port', (process.env.PORT || 8080))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', function (request, respond) {
    ejs.renderFile('index.ejs', {data: 'testing 123'}, {}, function(err, html) {
        response.send(html)
    })
})

app.use(express.static(__dirname + '/public'))

app.listen(app.get('port'), function () {
    console.log('Listening to port 8080 !', app.get('port'))
})
