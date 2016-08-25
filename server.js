var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var https = require('request')
app.use(bodyParser.json())
app.use(cors())


app.set('port', (process.env.PORT || 8080))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

var knex = require('knex') ( {
    client: 'pg',
    connection: (process.env.DATABASE_URL || 'postgres://localhost/jh2642'),
    searchPath: 'knex,public'
})

app.get('/googlesignin', function (request, response) {
    https.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + request.query.id_token, function (err, data, body) {
        response.json(JSON.parse(body));
    })
})

//this locates the lat and long of an address
app.get('/api/v1/geoloc', function (request, response) {
    https.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + request.query.address +  '&key=AIzaSyCHYYAP2pKpLvN6kcCO8W9zkM-Oct2d2A4', function (err, data, body) {
        response.json(JSON.parse(body));
        data.on('data', (d) => {
            response.json(d)
        })

    })
})

//this is the api to get google places data//
app.get('/api/v1/places', function (request, response) {
    https.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + request.query.location + '&radius=16094&type=' + request.query.type + '&key=AIzaSyCHYYAP2pKpLvN6kcCO8W9zkM-Oct2d2A4', function (err, data, body) {
        var body = JSON.parse(body)
        body.results = body.results.filter(function(place) {
            return (
                !place.name.includes('Subway')
                // &&
                // !place.name.includes('McDonalds')
            )
        })
        response.json(body);
        // data.on('data', (d) => {
        //     response.json(d)
        // })

    })
})


//this is the api to get the details of a specific location
app.get('/api/v1/details', function (request, response) {
    https.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + request.query.placeid +
    '&key=AIzaSyCHYYAP2pKpLvN6kcCO8W9zkM-Oct2d2A4', function (err, data, body) {
        response.json(JSON.parse(body));
        data.on('data', (d) => {
            response.json(d)
        })
    })
})

app.post('/users/create', function (request, response) {
    response.json(request.body)
})

app.use(express.static(__dirname + '/public'))

app.listen(app.get('port'), function () {
    console.log('Listening to port 8080 !', app.get('port'))
})
