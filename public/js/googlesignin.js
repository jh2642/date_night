var api = 'https://datenight2016.herokuapp.com'
var user_id = null
var googlesignin = new Event('googlesignin')

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/googlesignin?id_token=' + id_token);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        //   console.log('Signed in as: ' + xhr.responseText);
        if(!location.href.includes('profile.html') && !location.href.includes('schedule.html') && !location.href.includes('search.html')) {
             location="/profile.html"
        }
    };
    xhr.send();

    fetch(api+'/users/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: profile.getName(),
            image_url: profile.getImageUrl(),
            email: profile.getEmail()
        })
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        user_id=response
        window.dispatchEvent(googlesignin)
        if(!location.href.includes('profile.html') && !location.href.includes('schedule.html') && !location.href.includes('search.html')) {
             location="/profile.html"
        }
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        //added to redirect to the index page after log out
        location="/index.html"
    });
}
