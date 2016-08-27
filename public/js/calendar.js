

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
            document.getElementById('createEvents').addEventListener('click', function() {
                console.log('createEvents')
                gapi.client.load('calendar', 'v3', createEvents);
            });
            document.getElementById('deleteEvents').addEventListener('click', function() {
                console.log('deleteEvents')
                gapi.client.load('calendar', 'v3', deleteEvents);
            });
            document.getElementById('updateEvents').addEventListener('click', function() {
                console.log('updateEvents')
                gapi.client.load('calendar', 'v3', updateEvents);
            });

        }



        /**
        * Print the summary and start datetime/date of the next ten events in
        * the authorized user's calendar. If no events are found an
        * appropriate message is printed.
        */
        // function listUpcomingEvents() {
        //     var request = gapi.client.calendar.events.list({
        //         'calendarId': 'primary',
        //         'timeMin': (new Date()).toISOString(),
        //         'showDeleted': false,
        //         'singleEvents': true,
        //         'maxResults': 5,
        //         'orderBy': 'startTime'
        //     });
        //
        //     request.execute(function(resp) {
        //         var events = resp.items;
        //         console.log(events)
        //         // document.getElementById('calendarEvents').innerHTML = events
        //         appendPre('Upcoming events:');
        //
        //         if (events.length > 0) {
        //             for (i = 0; i < events.length; i++) {
        //                 var event = events[i];
        //                 var when = event.start.dateTime;
        //                 if (!when) {
        //                     when = event.start.date;
        //                 }
        //                 appendPre(event.summary + ' (' + when + ')')
        //             }
        //         } else {
        //             appendPre('No upcoming events found.');
        //         }
        //
        //     });
        // }

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
            var startTime = moment(document.getElementById('startTime').value);
            var endTime = '2016-08-30T21:30:00+00:00';
            var dateEmail = response.date_email;
            var yourEmail = response.email;
            var dateLoc = eachLoc;
            var dateSum = 'Date Night';
            var descriptionDate = document.getElementById('messageBox').value
            // var attachmentHere = locationUrl

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
                        {email: yourEmail,
                      },
                  ],
                //   attachments: [
                //       {
                //         fileUrl: attachmentHere
                //       }
                //   ],
                location: dateLoc,
                description: descriptionDate,
                reminders: {
                    useDefault: false
                },
                summary: dateSum,
                //   send-notification: 'true',
            })


            request2.execute(function(resp2) {
                // var events2 = resp2.items;
                idToDelete = resp2.id
                //fetch to my api to add this event to the event db (post)
                console.log(resp2)
            });
        }) //close out function to schedule cal event
    } //close out createEvents


        //delete event here
        function deleteEvents() {

            var deleteId = document.getElementById('deleteId').value;

            var request3 = gapi.client.calendar.events.delete({
                calendarId: 'primary',
                eventId: deleteId,
            });

            request3.execute(function(resp3) {
                // var events2 = resp2.items;
                console.log(resp3)
            });
        }

        //update event here
        function updateEvents() {

            var startTime2 = '2016-08-24T21:00:00+00:00';
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


        /**
        * Append a pre element to the body containing the given message
        * as its text node.
        *
        * @param {string} message Text to be placed in pre element.
        */
        // function appendPre(message) {
        //     var pre = document.getElementById('output');
        //     var textContent = document.createTextNode(message + '\n');
        //     pre.appendChild(textContent);
        // }
