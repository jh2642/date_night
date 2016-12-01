var api = 'https://datenight2016.herokuapp.com'
var user_id = null
var calId
var googlesignin = new Event('googlesignin')
var dateCalendar

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
        var featureImage = document.createElement('img')
        featureImage.setAttribute('src', response.image_url)
        featureImage.classList.add('img-circle')
        var individualName = document.getElementById('googleName')
        individualName.innerHTML = response.name
        var individualEmail = document.getElementById('googleEmail')
        individualEmail.innerHTML = response.email

        dateCalendar = response.email

        document.getElementById('googlePic').innerHTML = ''
        document.getElementById('googlePic').appendChild(featureImage)

        document.getElementById('dateInformation').innerHTML = response.date_name
        document.getElementById('datesEmail').innerHTML = response.date_email
        document.getElementById('dateInformation2').innerHTML = response.date_name
        document.getElementById('datesEmail2').innerHTML = response.date_email

        if(document.getElementById('dateInformation').innerHTML === '') {
            document.getElementById('dateProfileBox2').classList.remove('hidden')
            document.getElementById('dateProfileBox').classList.add('hidden')
            document.getElementById('dateProfileBox3').classList.remove('hidden')
            document.getElementById('dateProfileBox4').classList.add('hidden')
        }

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

            response.forEach(function(item) {

                var div = document.createElement('div')
                div.classList.add('dateNightEvent', 'col-xs-12', 'col-md-4', 'text-center', 'eventBoxesProfile')

                var eventDetails = document.createElement('i')
                eventDetails.setAttribute('calendar-id', item.calendar_id)
                eventDetails.classList.add('glyphicon', 'glyphicon-remove', 'calendar-id', 'text-right')
                div.appendChild(eventDetails)

                var name = document.createElement('h3')
                name.innerHTML = item.rest_name
                div.appendChild(name)

                var address = document.createElement('p')
                address.innerHTML = item.address
                div.appendChild(address)

                var dateDate = document.createElement('p')
                dateDate.innerHTML = 'on ' + moment(item.event_at).format('LLLL')
                div.appendChild(dateDate)

                var dateAttendee = document.createElement('h3')
                dateAttendee.innerHTML = 'with ' + item.date_name
                div.appendChild(dateAttendee)

                if(item.guest1 != item.your_email) {
                    var guestsTag = document.createElement('p')
                    guestsTag.innerHTML = 'you also invited...'
                    guestsTag.classList.add('invitedText')
                    div.appendChild(guestsTag)

                    var guests = document.createElement('p')
                    guests.innerHTML = item.guest1
                    div.appendChild(guests)
                }
                if(item.guest2 != item.your_email) {
                    var guest2 = document.createElement('p')
                    guest2.innerHTML = item.guest2
                    div.appendChild(guest2)
                }
                if(item.guest3 != item.your_email) {
                    var guest3 = document.createElement('p')
                    guest3.innerHTML = item.guest3
                    div.appendChild(guest3)
                }
                if(item.guest4 != item.your_email) {
                    var guest4 = document.createElement('p')
                    guest4.innerHTML = item.guest4
                    div.appendChild(guest4)
                }
                if(item.guest5 != item.your_email) {
                    var guest5 = document.createElement('p')
                    guest5.innerHTML = item.guest5
                    div.appendChild(guest5)
                }

                if(moment(item.event_at) >= moment()) {
                    document.getElementById('noEventsMessage').classList.add('hidden')
                    document.getElementById('calendarEventsDb').appendChild(div)
                }
                if(moment(item.event_at) < moment()) {
                    document.querySelector('.pastEventBox').classList.remove('hidden')
                    document.getElementById('pastCalendarEventsDb').appendChild(div)
                }
            })
        })
    })
    .then(function() {
        fetch(api+'/events/datenight/datee?dateemail=' + your_email, {
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
})



//delete scheduled events
$(document).ready(function(){
    $('body').on('click', '.calendar-id', function(){
        calId = $(this).attr('calendar-id')
        checkAuth();
        handleAuthClick();
        gapi.client.load('calendar', 'v3', deleteEvents);
    })
})
