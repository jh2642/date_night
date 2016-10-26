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
var typeSearch
var ratingPlace

document.body.addEventListener('click', function(e) {
    if(e.target.className.includes('selectDetail2')) {
        document.getElementById('grabDetails2').classList.remove('hidden')
        window.scrollTo(0,0);
    }
})

document.getElementById('addFriends').addEventListener('click', function() {

    document.querySelector('.friendsTopper').classList.remove('hidden')
    document.querySelector('.addFriendButton').classList.add('hidden')

})

// $().button('toggle')

document.getElementById('getDetails2').addEventListener('click', function() {

    var address = document.getElementById('address').value
    // var typeOne = "movie_theater"
    // var typeTwo = "restaurant"
    // var typeThree = "bar"
    var getId1 = "localRestaurants"
    var typeSearch = document.getElementById('searchTerm').value


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

        //search fetch - on the server.js file I have to add query becayse that is what I typed below after the ?

        fetch(api+'/api/v1/search?query=' + typeSearch + '&location=' + newAddress , {
            method: 'GET'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {

            document.getElementById('searchLocation2').innerHTML = ''
            response.results.forEach(function(item) {
                var div = document.createElement('div')
                div.classList.add('establishment', 'col-sm-4')

                var name = document.createElement('h2')
                name.innerHTML = item.name
                div.appendChild(name)

                var address = document.createElement('p')
                address.innerHTML = item.formatted_address
                div.appendChild(address)

                if(item.rating === null || item.rating === ratingPlace) {
                    var rating = document.createElement('p')
                    rating.innerHTML = "Rating not available"
                    div.appendChild(rating)
                }
                else {
                    var rating = document.createElement('p')
                    rating.innerHTML = "Rating: " + item.rating
                    div.appendChild(rating)
                }
                // var rating = document.createElement('p')
                // rating.innerHTML = "Rating: " + item.rating
                // div.appendChild(rating)

                var checkbox = document.createElement('input');
                checkbox.type = 'radio';
                checkbox.name = 'venueSelected';
                checkbox.value = item.place_id;
                checkbox.classList = 'selectDetail2';
                var label = document.createElement('label')
                label.htmlFor = 'checkbox-id';
                label.classList = 'selectLabel';
                label.appendChild(document.createTextNode('select for date'));
                div.appendChild(checkbox);
                div.appendChild(label);
                document.getElementById('searchLocation2').appendChild(div)

                var details = document.createElement('button')
                details.setAttribute('location-id', item.place_id)
                details.classList.add('btn', 'location-id')
                details.innerHTML = 'reviews'
                div.appendChild(details)

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
                        console.log(response)

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
                        rating.innerHTML = "rating: " + response.rating
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

                            var reviewAuthor = document.createElement('p')
                            reviewAuthor.classList.add('reviewAuthor', 'text-right')
                            reviewAuthor.innerHTML = reviewArray.author_name
                            div.appendChild(review)
                            div.appendChild(reviewAuthor)
                        })

                        document.getElementById('detailModal').innerHTML = ''
                        document.getElementById('detailModal').appendChild(div)
                    })
                })
            }) //closing modal
        })
    })
})


document.getElementById('grabDetails2').addEventListener('click', function() {

    var checkboxes = document.querySelectorAll('.selectDetail2:checked')

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
