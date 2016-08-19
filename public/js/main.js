// url (required), options (optional)
var latitude
var longitude

document.getElementById('getDetails').addEventListener('click', function() {
    // var type = document.getElementById('type').value
    var address = document.getElementById('address').value
    var typeOne = "movie_theater"
    var typeTwo = "restaurant"
    var typeThree = "bar"

    fetch('/api/v1/geoloc?address=' + address , {
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
        fetch('/api/v1/places?type=' + typeOne + '&location=' + newAddress , {
            method: 'GET'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            console.log(response)
            response.results.forEach(function(item) {
              var div = document.createElement('div')
              div.classList.add('establishment')
            //   div.setAttribute('href', item.photos[0].html_attributions[0])

              var img = document.createElement('img')
              img.setAttribute('src', item.icon)
              console.log(item) 
              div.appendChild(img)

              var name = document.createElement('p')
              name.innerHTML = item.name
              div.appendChild(name)

              var address = document.createElement('p')
              address.innerHTML = item.vicinity
              div.appendChild(address)

            //   var price = document.createElement('p')
            //   price.innerHTML = "Price Level: " + item.price_level
            //   div.appendChild(price)

              var rating = document.createElement('p')
              rating.innerHTML = "Rating: " + item.rating
              div.appendChild(rating)

              document.getElementById('movieTheater').appendChild(div)

          })
        })
//restaurant fetch
        fetch('/api/v1/places?type=' + typeTwo + '&location=' + newAddress , {
            method: 'GET'
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            console.log(response)
            response.results.forEach(function(item) {
              var div = document.createElement('div')
              div.classList.add('establishment')
            //   div.setAttribute('href', item.photos[0].html_attributions[0])

              var img = document.createElement('img')
              img.setAttribute('src', item.icon)
              console.log(item)
              div.appendChild(img)

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

              document.getElementById('localRestaurants').appendChild(div)

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
            console.log(response)
            response.results.forEach(function(item) {
              var div = document.createElement('div')
              div.classList.add('establishment')
            //   div.setAttribute('href', item.photos[0].html_attributions[0])

              var img = document.createElement('img')
              img.setAttribute('src', item.icon)
              console.log(item)
              div.appendChild(img)

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

              document.getElementById('localBar').appendChild(div)

          })
        })
    })
})
