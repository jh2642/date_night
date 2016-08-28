var api = 'https://serene-hamlet-75445.herokuapp.com'
var user_id = null
var calId


// document.getElementById('addDateInfo').addEventListener('click', function() {
//
//     var datesNameUpdate = document.getElementById('datesNameUpdate').value
//     var datesEmailUpdate = document.getElementById('datesEmailUpdate').value
//     console.log(datesNameUpdate, datesEmailUpdate)
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
            date_name: document.getElementById('datesNameUpdate').value,
            date_email: document.getElementById('datesEmailUpdate').value,
            date_phone_number: document.getElementById('datesPhoneUpdate').value
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
        // console.log(response)
        document.getElementById('dateInformation').innerHTML = response.date_name
        document.getElementById('datesEmail').innerHTML = response.date_email
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
    .then(function() {
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
            // console.log(response)
            response.forEach(function(item) {

                var div = document.createElement('div')
                div.classList.add('dateNightEvent', 'col-md-3')

                var name = document.createElement('h3')
                name.innerHTML = item.rest_name
                div.appendChild(name)

                var address = document.createElement('p')
                address.innerHTML = item.address
                div.appendChild(address)

                var dateAttendee = document.createElement('p')
                dateAttendee.innerHTML = 'with ' + item.date_name
                div.appendChild(dateAttendee)

                var dateDate = document.createElement('p')
                dateDate.innerHTML = 'on ' + moment(item.event_at).format('LLLL')
                div.appendChild(dateDate)

                var eventDetails = document.createElement('button')
                eventDetails.setAttribute('calendar-id', item.calendar_id)
                eventDetails.classList.add('btn', 'btn-primary', 'calendar-id')
                eventDetails.innerHTML = 'delete event'
                div.appendChild(eventDetails)

                document.getElementById('calendarEventsDb').appendChild(div)
            })
        })
    })
})

// $(document).ready(function(){
//     $('body').on('click', '.calendar-id', function(){
//
//         calId = $(this).attr('calendar-id')
//         console.log(calId)
//
//         fetch(api+'/events/deletedatenight?user_id=' + user_id, {
//             method: 'DELETE',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 calendar_id: calId,
//             })
//         })
//         .then(function (count) {
//           console.log(count);
//         })
//     })
// })

//retrieve data from events db
// document.getElementById('retrieveEvent').addEventListener('click', function() {
// fetch(api+'/events/datenight?id=' + user_id, {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })
// .then(function(response) {
//     return response.json()
// })
// .then(function(response) {
//     // console.log(response)
//     response.forEach(function(item) {
//
//         var div = document.createElement('div')
//         div.classList.add('dateNightEvent')
//
//         var name = document.createElement('h2')
//         name.innerHTML = item.event_at
//         div.appendChild(name)
//
//         var address = document.createElement('p')
//         address.innerHTML = item.address
//         div.appendChild(address)
//
//         var dateAttendee = document.createElement('p')
//         dateAttendee.innerHTML = 'with: ' + item.date_name
//         div.appendChild(dateAttendee)
//
//         var eventDetails = document.createElement('button')
//         eventDetails.setAttribute('calendar-id', item.calendar_id)
//         eventDetails.classList.add('btn', 'btn-primary', 'calendar-id')
//         eventDetails.innerHTML = 'delete event'
//         div.appendChild(eventDetails)
//
//         document.getElementById('calendarEventsDb').appendChild(div)
//         console.log(item.calendar_id)
//     })
// })
// })


// document.getElementById("dateReminder").flatpickr();
