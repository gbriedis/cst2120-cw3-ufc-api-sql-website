$(document).ready(function(){
    if(sessionStorage.getItem('loggedIn') == 'true'){
        $('#settings-nav-btn').removeClass('hidden')
        $('#register-nav-btn').addClass('hidden')
        $('#sign-in-btn').addClass('hidden')
        $('#sign-out-btn').removeClass('hidden')

        username = sessionStorage.getItem('username')

        $('#nav-username').append(username)
        $('#nav-username').removeClass('hidden')
        $('#nav-avatar').removeClass('hidden')
        $('#nav-rep').removeClass('hidden')
    }
})