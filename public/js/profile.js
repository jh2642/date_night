var api = 'https://serene-hamlet-75445.herokuapp.com'
var user_id = null

document.getElementById('addDateInfo').addEventListener('click', function() {

    var datesName = document.getElementById('datesName').value
    var datesEmail = document.getElementById('datesEmail').value
    console.log(datesName, datesEmail)
})

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
fetch(api+'/users/profile', {
    method: 'GET',
    // credentials: 'include',
    // headers: {
    //   'Content-Type': 'application/json'
    // }
})
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log('you did it')
    })

    fetch(api+'/users/profile').then(function(response) { 
	// Convert to JSON
	return response.json();
}).then(function(j) {
	// Yay, `j` is a JavaScript object
	console.log(j);
});
