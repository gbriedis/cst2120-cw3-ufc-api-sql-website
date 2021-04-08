// 
// file used to Login user
//

$(document).ready(function(){
    ss = window.sessionStorage;

    $('#login-submit-btn').click(function(){

        var username = $('#login-username-input').val();
        var password = $('#login-password-input').val();

        let login_succ = "<h1 class='text-gray-50 text-center text-lg font-semibold'>Hey, " + username +"</h1>"


        data = {
            "username": username,
            "password": password
        }

        $.ajax({
            url: 'http://localhost:8080/login',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(data) {
                if(data == "Logged in") {
                    $('#login-unsuccessfull-banner').addClass('hidden')
                    $('#login-successfull-banner').removeClass('hidden')
                    $('#login-succ-text').append(login_succ)

                    ss.setItem('loggedIn', 'true')
                    ss.setItem('username', username)

                    location.reload()
                }
                else if(data == "Incorrect Username and/or Password!" || "Please enter Username and Password!"){
                    $('#login-unsuccessfull-banner').removeClass('hidden')
                }
                else if(data == "User already Logged In"){
                    $('#login-unsuccessfull-banner').addClass('hidden')
                    $('#user-logged-in-banner').removeClass('hidden')
                }
            },
            error: function(data) {
                console.log(data);
            }
        })
    })


    // sign out button
    $('#sign-out-btn').click(function(){
        ss.removeItem('loggedIn')
        ss.removeItem('username')

        $.ajax({
            url: 'http://localhost:8080/logout',
            type: 'POST',
            data: 'logout',
        })

        location.reload()
    })
})