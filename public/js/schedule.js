
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

            loadCalendarApi();

            //get profile information from db
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
                // var featureImage = document.createElement('img')
                // featureImage.setAttribute('src', response.image_url)
                // featureImage.classList.add('img-circle')
                // var individualName = document.getElementById('googleName')
                // individualName.innerHTML = response.name
                // var individualEmail = document.getElementById('googleEmail')
                // individualEmail.innerHTML = response.email
                //
                // document.getElementById('googlePic').innerHTML = ''
                // document.getElementById('googlePic').appendChild(featureImage)
                document.getElementById('dateName2').innerHTML = response.date_name
                document.getElementById('dateEmail2').innerHTML = response.date_email

                if(response.date_email === '') {
                    console.log('OMG')
                    document.getElementById('formDetailsNew').classList.remove('hidden')
                    document.getElementById('formDetailsOld').classList.add('hidden')
                }

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
    function handleAuthClick() {
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
            document.getElementById('createEvents').addEventListener('click', function() {
                // console.log('createEvents')
                gapi.client.load('calendar', 'v3', createEvents);
            });
            // document.getElementById('scheduleReminder').addEventListener('click', function() {
            //     gapi.client.load('calendar', 'v3', scheduleReminder);
            // });
            // document.getElementById('calendar-id').addEventListener('click', function() {
            //     console.log('calendar-id')
            //     gapi.client.load('calendar', 'v3', deleteEvents);
            // });
            // document.getElementById('updateEvents').addEventListener('click', function() {
            //     console.log('updateEvents')
            //     gapi.client.load('calendar', 'v3', updateEvents);
            // });
        }

        //create event here
        function createEvents() {
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
                var d = new Date(document.getElementById('startTime').value);
                var startTime = d.toISOString();
                var endTime = moment(startTime).add( 2, 'hours' ).toISOString();
                var dateEmail = response.date_email;
                var dateName = response.date_name;
                var yourEmail = response.email;
                var dateLoc = dateNight;
                var dateSum = 'Date Night';
                var descriptionDate = document.getElementById('messageBox').value
                var emailInstead = document.getElementById('newEmail').value
                var nameInstead = document.getElementById('newName').value
                var pickupInfo = document.querySelector('input[name="meetDate"]:checked').value;

                var meetingDate

                if (emailInstead.length) {
                    var dateEmail = emailInstead
                }

                if (nameInstead.length) {
                    var dateName = nameInstead
                }

                var request2 = gapi.client.calendar.events.insert({
                    calendarId: 'primary',
                    start: {
                        dateTime: startTime
                    },
                    end: {
                        dateTime: endTime
                    },
                    attendees: [
                        {
                            email: dateEmail
                        },
                        {email: yourEmail
                        },
                    ],
                    location: dateLoc,
                    description: pickupInfo + descriptionDate,
                    reminders: {
                        useDefault: false
                    },
                    summary: dateSum,
                    //   send-notification: 'true',
                })


                request2.execute(function(resp2) {
                    idForEvent = resp2.id

                    //fetch to my api to add this event to the event db (post)
                    fetch(api+'/events/datenight', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            address: locationAddress,
                            lat: latitude,
                            long: longitude,
                            event_at: startTime,
                            user_id: user_id,
                            date_name: dateName,
                            rest_id: locationId,
                            rest_name: locationName,
                            date_email: dateEmail,
                            special_comments: pickupInfo + descriptionDate,
                            calendar_id: idForEvent
                        })
                    })
                    .then(function() {
                        location="/profile.html"
                    })
                });
            }) //close out function to schedule cal event
        } //close out createEvents

        //create reminder here
        function scheduleReminder() {
            console.log('you clicked me')
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
                var d3 = new Date(document.getElementById('dateReminder').value);
                var startTime3 = d3.toISOString();
                var endTime3 = moment(startTime3).add( 1, 'hours' ).toISOString();
                var yourEmail3 = response.email;
                var dateSum3 = 'Schedule a Date Night';



                var request4 = gapi.client.calendar.events.insert({
                    calendarId: 'primary',
                    start: {
                        dateTime: startTime3
                    },
                    end: {
                        dateTime: endTime3
                    },
                    attendees: [
                        {
                            email: yourEmail3
                        },
                    ],
                    // recurrence: [
                    //         'weekly'
                    // ],
                    reminders: {
                        useDefault: false
                    },
                    summary: dateSum3,
                    //   send-notification: 'true',
                })


                request4.execute(function(resp4) {
                    idToDelete2 = resp4.id
                    //fetch to my api to add this event to the event db (post)
                    console.log(resp4)
                });
            }) //close out function to schedule cal reminders
        } //close out sched reminder


        //delete event here
        function deleteEvents() {

            // var deleteId = document.getElementById('deleteId').value;

            var request3 = gapi.client.calendar.events.delete({
                calendarId: 'primary',
                eventId: calId,
            });

            request3.execute(function(resp3) {
                // var events2 = resp2.items;
                fetch(api+'/events/deletedatenight?calendar_id=' + calId, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(function() {
                    location.reload();
                })
            });
        }

        //update event here
        function updateEvents() {

            var startTime2 = '2016-08-28T21:00:00+00:00';
            var endTime2 = '2016-08-24T21:30:00+00:00';
            var dateEmail2 = document.getElementById('dateEmail2').value;
            var dateLoc2 = document.getElementById('dateLoc2').value;
            var dateSum2 = 'Date Night';
            var eventId2 = document.getElementById('eventId2').value;

            var request3 = gapi.client.calendar.events.update({
                calendarId: 'primary',
                eventId: eventId2,
                start: {
                    dateTime: startTime2
                },
                end: {
                    dateTime: endTime2
                },
                attendees: [
                    {
                        email: dateEmail2,
                    }
                ],
                location: dateLoc2,
                summary: dateSum2,
            });

            request3.execute(function(resp3) {
                // var events2 = resp2.items;
                console.log(resp3)
            });
        }
