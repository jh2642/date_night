var api = 'https://serene-hamlet-75445.herokuapp.com'
var user_id = null

document.getElementById('addDateInfo').addEventListener('click', function() {

    var datesName = document.getElementById('datesName').value
    var datesEmail = document.getElementById('datesEmail').value
    console.log(datesName, datesEmail)
})

//my attempt to patch a date email and name to existing user
document.getElementById('addDateInfo').addEventListener('click', function() {
fetch(api+'/users/update', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        // user_id: 1,
        date_name: document.getElementById('datesName').value,
        date_email: document.getElementById('datesEmail').value
    })
})
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        date_name=response
    })
})
