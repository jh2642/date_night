var api = 'https://serene-hamlet-75445.herokuapp.com'
var user_id = null

// document.getElementById('addDateInfo').addEventListener('click', function() {
//
//     var datesName = document.getElementById('datesName').value
//     var datesEmail = document.getElementById('datesEmail').value
//     console.log(datesName, datesEmail)
// })

//change info for existing user
document.getElementById('addDateInfo').addEventListener('click', function() {
fetch(api+'/users/update', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: user_id,
        date_name: document.getElementById('datesName').value,
        date_email: document.getElementById('datesEmail').value,
        date_phone_number: document.getElementById('datesPhone').value
    })
})
    .then(function(response) {
        return response.json()
    })
})

//get profile information from db
window.addEventListener('googlesignin', function() {
    fetch(api+'/users/profile?id=' + user_id, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response)
        document.getElementById('dateInformation').innerHTML = response.date_name
        var featureImage = document.createElement('img')
            featureImage.setAttribute('src', response.image_url)
            featureImage.classList.add('img-circle')
        var individualName = document.getElementById('googleName')
              individualName.innerHTML = response.name
        var individualEmail = document.getElementById('googleEmail')
            individualEmail.innerHTML = response.email

        document.getElementById('googlePic').innerHTML = ''
        document.getElementById('googlePic').appendChild(featureImage)
    })

})

//retrieve data from db
document.getElementById('retrieveEvent').addEventListener('click', function() {
    fetch(api+'/events/datenight?id=' + user_id, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response)
        // response.results.forEach(function(result) {
        //     console.log(result)
        // })
    })
})

// document.getElementById("dateReminder").flatpickr();
