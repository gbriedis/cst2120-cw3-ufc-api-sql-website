//
// File for opening and closing Login and Register form
//

// close login form
$('#close-login-btn').click(function() {
    $('#login-form').addClass('hidden')
})

// open login form
$('#sign-in-btn').click(function() {
    $('#login-form').removeClass('hidden')
})


// close register form
$('#close-register-btn').click(function(){
    $('#register-form-popup').addClass('hidden')
})

$('#register-nav-btn').click(function() {
    $('#register-form-popup').removeClass('hidden')
})

// close settings form
$('#close-settings-btn').click(function(){
    $('#settings-form-popup').addClass('hidden')
})

// open settings form
$('#settings-nav-btn').click(function(){
    $('#settings-form-popup').removeClass('hidden')
})