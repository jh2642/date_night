var latitude
var longitude
var id
var locationName
var locationAddress
var locationPhoneNumber
var locationUrl
var eachLoc
var selectedVenue
var locationId
var dateName
var dateNight


document.body.addEventListener('click', function(e) {
    if(e.target.className.includes('selectDetail')) {
        document.getElementById('grabDetails').classList.remove('hidden')
        window.scrollTo(0,0);
    }
})

$().button('toggle')

document.getElementById('addFriends').addEventListener('click', function() {

    document.querySelector('.friendsTopper').classList.remove('hidden')
    document.querySelector('.addFriendButton').classList.add('hidden')

})

document.getElementById('getDetails').addEventListener('click', function() {

    var address = document.getElementById('address').value
    var typeOne = "movie_theater"
    var typeTwo = "restaurant"
    var typeThree = "bar"
    var getId1 = "localRestaurants"

    document.querySelector('.searchTopper').classList.add('searched')
    document.querySelector('.searchResultBox').classList.remove('hidden')

    fetch(api+'/api/v1/geoloc?address=' + address , {
        method: 'GET'
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {

        latitude = response.results[0].geometry.location.lat
        longitude = response.results[0].geometry.location.lng

        var newAddress = latitude + ',' + longitude

        //movie fetch
        fetch(api+'/api/v1/places?type=' + typeOne + '&location=' + newAddress , {
            method: 'GET'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            document.getElementById('movieTheater').innerHTML = ''
            response.results.forEach(function(item) {
                if (item.types[0] === typeOne) {
                    var div = document.createElement('div')
                    div.classList.add('establishment')

                    var name = document.createElement('h2')
                    name.innerHTML = item.name
                    div.appendChild(name)

                    var address = document.createElement('p')
                    address.innerHTML = item.vicinity
                    div.appendChild(address)

                    var rating = document.createElement('p')
                    rating.innerHTML = "rating: " + item.rating
                    div.appendChild(rating)

                    var checkbox = document.createElement('input');
                    checkbox.type = 'radio';
                    checkbox.name = 'venueSelected';
                    checkbox.value = item.place_id;
                    checkbox.classList = 'selectDetail';
                    var label = document.createElement('label')
                    label.htmlFor = 'checkbox-id';
                    label.classList = 'selectLabel';
                    label.appendChild(document.createTextNode('select for date'));
                    div.appendChild(checkbox);
                    div.appendChild(label);
                    document.getElementById('movieTheater').appendChild(div)

                    var details = document.createElement('button')
                    details.setAttribute('location-id', item.place_id)
                    details.classList.add('btn', 'location-id')
                    details.innerHTML = 'reviews'
                    div.appendChild(details)
                }
            })
        })

        //restaurant fetch
        fetch(api+'/api/v1/places?type=' + typeTwo + '&location=' + newAddress , {
            method: 'GET'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {

            document.getElementById('localRestaurants').innerHTML = ''
            response.results.forEach(function(item) {
                // if (item.types[0] === typeTwo) {
                    var div = document.createElement('div')
                    div.classList.add('establishment')

                    var name = document.createElement('h2')
                    name.innerHTML = item.name
                    div.appendChild(name)

                    var address = document.createElement('p')
                    address.innerHTML = item.vicinity
                    div.appendChild(address)

                    var rating = document.createElement('p')
                    rating.innerHTML = "rating: " + item.rating
                    div.appendChild(rating)

                    var checkbox = document.createElement('input');
                    checkbox.type = 'radio';
                    checkbox.name = 'venueSelected';
                    checkbox.value = item.place_id;
                    checkbox.classList = 'selectDetail';
                    var label = document.createElement('label')
                    label.htmlFor = 'checkbox-id';
                    label.classList = 'selectLabel';
                    label.appendChild(document.createTextNode('select for date'));
                    div.appendChild(checkbox);
                    div.appendChild(label);
                    document.getElementById('localRestaurants').appendChild(div)

                    var details = document.createElement('button')
                    details.setAttribute('location-id', item.place_id)
                    details.classList.add('btn', 'location-id')
                    details.innerHTML = 'reviews'
                    div.appendChild(details)
                // }
            })
        })

        //bar fetch
        fetch(api+'/api/v1/places?type=' + typeThree + '&location=' + newAddress , {
            method: 'GET'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            document.getElementById('localBar').innerHTML = ''
            response.results.forEach(function(item) {
                // if (item.types[0] === typeThree) {
                    var div = document.createElement('div')
                    div.classList.add('establishment')

                    var name = document.createElement('h2')
                    name.innerHTML = item.name
                    div.appendChild(name)

                    var address = document.createElement('p')
                    address.innerHTML = item.vicinity
                    div.appendChild(address)

                    var rating = document.createElement('p')
                    rating.innerHTML = "rating: " + item.rating
                    div.appendChild(rating)

                    var checkbox = document.createElement('input');
                    checkbox.type = 'radio';
                    checkbox.name = 'venueSelected';
                    checkbox.value = item.place_id;
                    checkbox.classList = 'selectDetail';
                    var label = document.createElement('label')
                    label.htmlFor = 'checkbox-id';
                    label.classList = 'selectLabel';
                    label.appendChild(document.createTextNode('select for date'));
                    div.appendChild(checkbox);
                    div.appendChild(label);
                    document.getElementById('localBar').appendChild(div)

                    var details = document.createElement('button')
                    details.setAttribute('location-id', item.place_id)
                    details.classList.add('btn', 'location-id')
                    details.innerHTML = 'reviews'
                    div.appendChild(details)
                // }
            })
        })

        //this is the modal information
        $(document).ready(function(){
            $('body').on('click', '.location-id', function(){

                $("#location-id").modal('show');

                var id = $(this).attr('location-id')

                //details fetch
                fetch(api+'/api/v1/details?placeid=' + id, {
                    method: 'GET'
                })
                .then(function(response) {
                    return response.json()
                })
                .then(function(response) {

                    var div = document.createElement('div')
                    div.classList.add('modalEstablishment')

                    var name = document.createElement('h2')
                    name.innerHTML = response.result.name
                    div.appendChild(name)

                    var address = document.createElement('p')
                    address.innerHTML = response.result.formatted_address
                    div.appendChild(address)

                    var phone = document.createElement('p')
                    phone.innerHTML = response.result.formatted_phone_number
                    div.appendChild(phone)

                    var rating = document.createElement('p')
                    rating.innerHTML = "rating: " + response.result.rating
                    div.appendChild(rating)

                    var mapURL = document.createElement('a')
                    mapURL.innerHTML = 'click here to open google maps'
                    mapURL.setAttribute('href', response.result.url)
                    mapURL.setAttribute('target', '_blank')
                    mapURL.classList.add('mapURLbox')
                    div.appendChild(mapURL)

                    response.result.reviews.forEach(function(reviewArray){
                        var review = document.createElement('p')
                        review.classList.add('reviewText')
                        review.innerHTML = reviewArray.text

                        var reviewRating = document.createElement('p')
                        reviewRating.classList.add('reviewRating', 'text-right')
                        reviewRating.innerHTML = 'customer rating: ' + reviewArray.rating

                        var reviewAuthor = document.createElement('p')
                        reviewAuthor.classList.add('reviewAuthor', 'text-right')
                        reviewAuthor.innerHTML = reviewArray.author_name
                        div.appendChild(review)
                        div.appendChild(reviewRating)
                        div.appendChild(reviewAuthor)
                    })
                    // response.result.reviews.forEach(function(reviewArray){
                    //     var review = document.createElement('p')
                    //     review.classList.add('reviewText')
                    //     review.innerHTML = reviewArray.text
                    //
                    //     var reviewAuthor = document.createElement('p')
                    //     reviewAuthor.classList.add('reviewAuthor', 'text-right')
                    //     reviewAuthor.innerHTML = reviewArray.author_name
                    //     div.appendChild(review)
                    //     div.appendChild(reviewAuthor)
                    // })

                    document.getElementById('detailModal').innerHTML = ''
                    document.getElementById('detailModal').appendChild(div)
                })
            })
        }) //closing modal
    })
})


document.getElementById('grabDetails').addEventListener('click', function() {

    var checkboxes = document.querySelectorAll('.selectDetail:checked')

    checkboxes.forEach(function(id) {
        var eventPlaces = id.value

        fetch(api+'/api/v1/details?placeid=' + eventPlaces, {
            method: 'GET'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(selectedVenue) {
            locationType = selectedVenue.result.types[0]
            locationName = selectedVenue.result.name
            locationId = selectedVenue.result.id
            locationAddress = selectedVenue.result.formatted_address
            locationPhoneNumber = selectedVenue.result.formatted_phone_number
            locationUrl = selectedVenue.result.url

            eachLoc = locationName + ', ' + locationAddress + ', ' + locationPhoneNumber

            dateNight = eachLoc

            document.getElementById('dateLoc1').innerHTML = locationName;
            document.getElementById('dateTime').innerHTML = moment(document.getElementById('startTime').value).format('LLLL');

        })
    })
})


document.getElementById("startTime").flatpickr();
