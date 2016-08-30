var api = 'https://serene-hamlet-75445.herokuapp.com'
var user_id = null
var googlesignin = new Event('googlesignin')

//add date infor on sign up
document.getElementById('addDateInfo2').addEventListener('click', function() {
    fetch(api+'/users/update', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: user_id,
            date_name: document.getElementById('datesNameUpdate2').value,
            date_email: document.getElementById('datesEmailUpdate2').value,
            date_phone_number: document.getElementById('datesPhoneUpdate2').value
        })
    })
    .then(function(response) {
        return response.json()
    })
})
