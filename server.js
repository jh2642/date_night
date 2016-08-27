var express = require('express')
var session = require('express-session')
var app = express()
var bodyParser = require('body-parser')
//var cors = require('cors')
var https = require('request')
//app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }))

app.set('port', (process.env.PORT || 8080))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

var knex = require('knex') ( {
    client: 'pg',
    connection: (process.env.DATABASE_URL || 'postgres://localhost/jh2642'),
    searchPath: 'knex,public'
})

app.get('/googlesignin', function (request, response) {
    try {
        https.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + request.query.id_token, function (err, data, body) {
            response.json(JSON.parse(body));
        })
    }
    catch(e) {
        response.send(e)
    }
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

//creates user once they log in with google
app.post('/users/create', function (request, response) {
    knex('users').where('email', request.body.email).select('id').then(function(rows) {
        if(rows.length) {
            // request.session.user_id=rows[0].id
            // request.session.save(function() {
                response.json(rows[0].id)
            // })
        }
        else {
            knex('users').insert(request.body).then(function(ids) {
                // request.session.user_id=ids[0]
                // request.session.save(function() {
                    response.json(ids[0])
                // })
            })
        }
    })
})

//change info for existing user
app.patch('/users/update', function (request, response) {
    if (!request.body.date_name.length) {
        delete request.body.date_name
    }
    if (!request.body.date_email.length) {
        delete request.body.date_email
    }
    if (!request.body.date_phone_number.length) {
        delete request.body.date_phone_number
    }
    knex('users')
    .where('id', request.body.id)
    .update(request.body)
    .then(function(ids) {
        response.json(ids[0])
    })
})

//get profile information from db
app.get('/users/profile', function (request, response) {
    knex('users')
    .select()
    .where('id', request.query.id)
    .then(function(details) {
        response.json(details[0])
    })
})

//add date to db
app.post('/events/date', function (request, response) {
    knex('events')
    .where('id', request.body.id)
    .update(request.body)
    .then(function(ids) {
        response.json(ids[0])
    })
})

app.use(express.static(__dirname + '/public'))

app.listen(app.get('port'), function () {
    console.log('Listening to port 8080 !', app.get('port'))
})
