var express = require('express')
var app = express()


app.set('port', (process.env.PORT || 8080))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

var knex = require('knex') ( {
    client: 'pg',
    connection: (process.env.PG_CONNECTION_STRING) || ('postgres://localhost/jh2642'),
    searchPath: 'knex,public'
})
app.get('/install', function( request, response) {
    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('name');
      table.timestamps();
        })
        .then(function() {
            console.log('created table')
        })

        response.send('Finished')
})

app.get('/', function (request, response) {
    var loggedIn = request.query.loggedin === 'yes'

    response.render('template', {loggedIn: loggedIn})
})

app.use(express.static(__dirname + '/public'))

app.listen(app.get('port'), function () {
    console.log('Listening to port 8080 !', app.get('port'))
})
