function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail());

var featureImage = document.createElement('img')
    featureImage.setAttribute('src', profile.getImageUrl())
    featureImage.classList.add('img-circle')
var individualName = document.getElementById('googleName')
      individualName.innerHTML = 'Name: ' + profile.getName()
var individualEmail = document.getElementById('googleEmail')
    individualEmail.innerHTML = 'Email: ' + profile.getEmail()

document.getElementById('googlePic').innerHTML = ''
document.getElementById('googlePic').appendChild(featureImage)
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      location.reload()
      //added to reload the page after the log out
    });
  }
