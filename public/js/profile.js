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
            console.log(response)
            response.forEach(function(item) {

                var div = document.createElement('div')
                div.classList.add('dateNightEvent')

                var name = document.createElement('h2')
                name.innerHTML = item.event_at
                div.appendChild(name)

                var address = document.createElement('p')
                address.innerHTML = item.address
                div.appendChild(address)

                var dateAttendee = document.createElement('p')
                dateAttendee.innerHTML = 'with: ' + item.date_name
                div.appendChild(dateAttendee)

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
//         var id = $(this).attr('calendar-id')
//         console.log(id)
//         //delete event here
//         function deleteEvents() {
// // https://www.googleapis.com/calendar/v3/calendars/primary/events/63ocp2bk46f1h8un03it2bu9lg?key={YOUR_API_KEY}
//
//             var request3 = 'https://www.googleapis.com/calendar/v3/calendars/primary/events/' + id + '&key=AIzaSyCHYYAP2pKpLvN6kcCO8W9zkM-Oct2d2A4'
//
//
//             request3.execute(function(resp3) {
//                 // var events2 = resp2.items;
//                 console.log(resp3)
//             });
//         }
//     })
// })



// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '528488731677-j7s7n0s15ju9b6h8h2u97kkmpidhp12f.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar"];

/**
* Check if current user has authorized this application.
*/
function checkAuth() {
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResult);
    }

    /**
    * Handle response from authorization server.
    *
    * @param {Object} authResult Authorization result.
    */
    function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
            // Hide auth UI, then load client library.
            authorizeDiv.style.display = 'none';
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
                    loadCalendarApi();
                })
            })
        }
        else {
            // Show auth UI, allowing the user to initiate authorization by
            // clicking authorize button.
            authorizeDiv.style.display = 'inline';
        }
    }

    // /**
    // * Initiate auth flow in response to user clicking authorize button.
    // *
    // * @param {Event} event Button click event.
    // */
    function handleAuthClick(event) {
        gapi.auth.authorize(
            {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
            handleAuthResult);
            return false;
        }

        /**
        * Load Google Calendar client library. List upcoming events
        * once client library is loaded.
        */

        function loadCalendarApi() {

            // document.getElementById('showEvents').addEventListener('click', function() {
            //     console.log('showEvents')
            //     gapi.client.load('calendar', 'v3', listUpcomingEvents);
            // });

            // document.getElementById('scheduleReminder').addEventListener('click', function() {
            //     gapi.client.load('calendar', 'v3', scheduleReminder);
            // });

            $(document).ready(function(){
                $('body').on('click', '.calendar-id', function(){

                    gapi.client.load('calendar', 'v3', deleteEvents);
                });
                // document.getElementById('updateEvents').addEventListener('click', function() {
                //     console.log('updateEvents')
                //     gapi.client.load('calendar', 'v3', updateEvents);
                // });

                //create reminder here
                // function scheduleReminder() {
                //     console.log('you clicked me')
                //     fetch(api+'/users/profile?id=' + user_id, {
                //         method: 'GET',
                //         credentials: 'include',
                //         headers: {
                //             'Content-Type': 'application/json'
                //         }
                //     })
                //     .then(function(response) {
                //         return response.json()
                //     })
                //     .then(function(response) {
                //         var d = new Date(document.getElementById('dateReminder').value);
                //         var startTime3 = d.toISOString();
                //         // var startTime3 = '2016-08-28T21:00:00+00:00';
                //         // moment(document.getElementById('dateReminder').value);
                //         console.log(startTime3)
                //         var endTime3 = '2016-08-27T16:00:00.000Z';
                //         var yourEmail3 = 'hildreth.james@gmail.com';
                //         var dateSum3 = 'Schedule a Date Night';
                //
                //
                //
                //         var request4 = gapi.client.calendar.events.insert({
                //             calendarId: 'primary',
                //             start: {
                //                 dateTime: startTime3
                //             },
                //             end: {
                //                 dateTime: endTime3
                //             },
                //             attendees: [
                //                 {
                //                     email: yourEmail3
                //                 },
                //             ],
                //             // recurrence: [
                //             //         'weekly'
                //             // ],
                //             reminders: {
                //                 useDefault: false
                //             },
                //             summary: dateSum3,
                //             //   send-notification: 'true',
                //         })
                //
                //
                //         request4.execute(function(resp4) {
                //             idToDelete2 = resp4.id
                //             //fetch to my api to add this event to the event db (post)
                //             console.log(resp4)
                //         });
                //     }) //close out function to schedule cal reminders
                // } //close out sched reminder


                //delete event here
                function deleteEvents() {
                    var id = $(this).attr('calendar-id')
                    console.log(id)

                    var request3 = gapi.client.calendar.events.delete({
                        calendarId: 'primary',
                        eventId: id,
                    });

                    request3.execute(function(resp3) {
                        // var events2 = resp2.items;
                        console.log(resp3)
                    });
                };
            })
}
                //update event here
                // function updateEvents() {
                //
                //     var startTime2 = '2016-08-28T21:00:00+00:00';
                //     var endTime2 = '2016-08-24T21:30:00+00:00';
                //     var dateEmail2 = document.getElementById('dateEmail2').value;
                //     var dateLoc2 = document.getElementById('dateLoc2').value;
                //     var dateSum2 = 'Date Night';
                //     var eventId2 = document.getElementById('eventId2').value;
                //
                //     var request3 = gapi.client.calendar.events.update({
                //         calendarId: 'primary',
                //         eventId: eventId2,
                //         start: {
                //             dateTime: startTime2
                //         },
                //         end: {
                //             dateTime: endTime2
                //         },
                //         attendees: [
                //             {
                //                 email: dateEmail2,
                //             }
                //         ],
                //         location: dateLoc2,
                //         summary: dateSum2,
                //     });
                //
                //     request3.execute(function(resp3) {
                //         // var events2 = resp2.items;
                //         console.log(resp3)
                //     });
                // }


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
