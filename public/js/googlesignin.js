var api = 'https://serene-hamlet-75445.herokuapp.com'
var user_id = null
var googlesignin = new Event('googlesignin')

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail());

    // var featureImage = document.createElement('img')
    //     featureImage.setAttribute('src', profile.getImageUrl())
    //     featureImage.classList.add('img-circle')
    // var individualName = document.getElementById('googleName')
    //       individualName.innerHTML = profile.getName()
    // var individualEmail = document.getElementById('googleEmail')
    //     individualEmail.innerHTML = profile.getEmail()
    //
    // document.getElementById('googlePic').innerHTML = ''
    // document.getElementById('googlePic').appendChild(featureImage)

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/googlesignin?id_token=' + id_token);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        //   console.log('Signed in as: ' + xhr.responseText);
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
    })
    .then(function() {
    //   location="/profile.html"
      location.replace("/profile.html");
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
