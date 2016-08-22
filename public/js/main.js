var latitude
var longitude
var id

document.getElementById('getDetails').addEventListener('click', function() {

    var address = document.getElementById('address').value
    var typeOne = "movie_theater"
    var typeTwo = "restaurant"
    var typeThree = "bar"
    var priceReq = document.getElementById('price').value
    var priceReq2 = document.getElementById('price2').value


    fetch('/api/v1/geoloc?address=' + address , {
        method: 'GET'
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        // console.log(priceReq)
        latitude = response.results[0].geometry.location.lat
        longitude = response.results[0].geometry.location.lng

        var newAddress = latitude + ',' + longitude

        //movie fetch
        fetch('/api/v1/places?type=' + typeOne + '&location=' + newAddress , {
            method: 'GET'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {

                response.results.forEach(function(item) {
                    if (item.types[0] === typeOne) {
                    var div = document.createElement('div')
                    div.classList.add('establishment')

                    var img = document.createElement('img')
                    img.setAttribute('src', item.icon)
                    div.appendChild(img)

                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'checkboxDetail';
                    checkbox.value = item.place_id;
                    checkbox.id = 'id';
                    checkbox.classList = 'toggle btn';
                    var label = document.createElement('label')
                    label.htmlFor = 'checkbox-id';
                    label.appendChild(document.createTextNode('Select for Date'));
                    div.appendChild(checkbox);
                    div.appendChild(label);

                    var name = document.createElement('p')
                    name.innerHTML = item.name
                    div.appendChild(name)

                    var address = document.createElement('p')
                    address.innerHTML = item.vicinity
                    div.appendChild(address)

                    var rating = document.createElement('p')
                    rating.innerHTML = "Rating: " + item.rating
                    div.appendChild(rating)

                    var details = document.createElement('button')
                    details.setAttribute('location-id', item.place_id)
                    details.classList.add('btn', 'btn-primary', 'location-id')
                    details.innerHTML = 'details'
                    div.appendChild(details)

                    document.getElementById('movieTheater').appendChild(div)

                }
            })
        })



        //restaurant fetch
        // fetch('/api/v2/places?type=' + typeTwo + '&location=' + newAddress + '&minprice=' + priceReq + '&maxprice=' + priceReq2 , {
        //     method: 'GET'
        // })
        fetch('/api/v1/places?type=' + typeTwo + '&location=' + newAddress , {
            method: 'GET'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            // console.log(response.results[0].types[0])
            // if (response.results[0].types[0] === typeTwo) {
            console.log(priceReq, priceReq2)
                response.results.forEach(function(item) {
                    if (item.types[0] === typeTwo) {
                    var div = document.createElement('div')
                    div.classList.add('establishment')

                    var img = document.createElement('img')
                    img.setAttribute('src', item.icon)
                    div.appendChild(img)

                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'checkboxDetail';
                    checkbox.value = item.place_id;
                    checkbox.id = 'checkbox-id';
                    checkbox.classList = 'toggle btn';
                    var label = document.createElement('label')
                    label.htmlFor = 'id';
                    label.appendChild(document.createTextNode('Select for Date'));
                    div.appendChild(checkbox);
                    div.appendChild(label);

                    var name = document.createElement('p')
                    name.innerHTML = item.name
                    div.appendChild(name)

                    var address = document.createElement('p')
                    address.innerHTML = item.vicinity
                    div.appendChild(address)

                    var price = document.createElement('p')
                    price.innerHTML = "Price Level: " + item.price_level
                    div.appendChild(price)

                    var rating = document.createElement('p')
                    rating.innerHTML = "Rating: " + item.rating
                    div.appendChild(rating)

                    var details = document.createElement('button')
                    details.setAttribute('location-id', item.place_id)
                    details.classList.add('btn', 'btn-primary', 'location-id')
                    details.innerHTML = 'details'
                    div.appendChild(details)

                    document.getElementById('localRestaurants').appendChild(div)

                }
            })
        })

        //bar fetch
        fetch('/api/v1/places?type=' + typeThree + '&location=' + newAddress , {
            method: 'GET'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            // console.log(response.results[0].types[0])
            //this pulls the 1st type in the location.
            // if (response.results[0].types[0] === typeThree) {
                response.results.forEach(function(item) {
                    if (item.types[0] === typeThree) {
                    var div = document.createElement('div')
                    div.classList.add('establishment')

                    var img = document.createElement('img')
                    img.setAttribute('src', item.icon)
                    div.appendChild(img)

                    // var toggleBox = document.createElement('input')
                    // img.setAttribute('checked data-toggle', 'toggle')
                    // div.appendChild(toggleBox)

                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'checkboxDetail';
                    checkbox.value = item.place_id;
                    checkbox.id = 'checkbox-id';
                    checkbox.classList = 'toggle btn';
                    var label = document.createElement('label')
                    label.htmlFor = 'id';
                    label.appendChild(document.createTextNode('Select for Date'));
                    div.appendChild(checkbox);
                    div.appendChild(label);

                    var name = document.createElement('p')
                    name.innerHTML = item.name
                    div.appendChild(name)

                    var address = document.createElement('p')
                    address.innerHTML = item.vicinity
                    div.appendChild(address)

                    var price = document.createElement('p')
                    price.innerHTML = "Price Level: " + item.price_level
                    div.appendChild(price)

                    var rating = document.createElement('p')
                    rating.innerHTML = "Rating: " + item.rating
                    div.appendChild(rating)

                    var details = document.createElement('button')
                    details.setAttribute('location-id', item.place_id)
                    details.classList.add('btn', 'btn-primary', 'location-id')
                    details.innerHTML = 'details'
                    div.appendChild(details)

                    document.getElementById('localBar').appendChild(div)
                }
            })
        })

//this is the modal information
        $(document).ready(function(){
            $('body').on('click', '.location-id', function(){

                $("#location-id").modal('show');

                var id = $(this).attr('location-id')
                // console.log(id)
                //details fetch
                fetch('/api/v1/details?placeid=' + id, {
                    method: 'GET'
                })
                .then(function(response) {
                    return response.json()
                })
                .then(function(response) {
                    // console.log(response.result)
                    var div = document.createElement('div')
                    div.classList.add('modalEstablishment')

                    var name = document.createElement('h3')
                    name.innerHTML = response.result.name
                    div.appendChild(name)

                    var address = document.createElement('p')
                    address.innerHTML = response.result.formatted_address
                    div.appendChild(address)

                    var phone = document.createElement('p')
                    phone.innerHTML = response.result.formatted_phone_number
                    div.appendChild(phone)

                    var mapURL = document.createElement('a')
                    mapURL.innerHTML = 'Click Here to open Google Maps'
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
