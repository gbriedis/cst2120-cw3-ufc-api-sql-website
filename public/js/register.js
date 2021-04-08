// 
// file used to Register user
//

$(document).ready(function(){

    $('#register-submit-btn').click(function(e) {
        e.preventDefault()
    
        var username = $('#register-username-input').val();
        var password = $('#register-password-input').val();
        var confPassword = $('#register-confirmPassword-input').val();
        var email = $('#register-email-input').val();

        data = {
            "username": username,
            "password": password,
            "email": email
        }

        $.ajax({
            url: 'http://localhost:8080/register',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(data) {
                if(data == "Added") {
                    //console.log(data)
                    $('#registration-successfull-banner').removeClass('hidden')

                }
            },
            error: function(data) {
                console.log(data);
            }
        })
        
    })
})

