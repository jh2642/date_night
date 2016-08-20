var express = require('express')
var app = express()
var https = require('request')


app.set('port', (process.env.PORT || 8080))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// var knex = require('knex') ( {
//     client: 'pg',
//     connection: (process.env.PG_CONNECTION_STRING || 'postgres://localhost/jh2642'),
//     searchPath: 'knex,public'
// })
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
        response.json(JSON.parse(body));
        data.on('data', (d) => {
            response.json(d)
        })

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

app.use(express.static(__dirname + '/public'))

app.listen(app.get('port'), function () {
    console.log('Listening to port 8080 !', app.get('port'))
})
