//
// File for opening and closing Global Chat
//

let chatActive = false;

// load chat 
$(document).ready(function(){
    $.ajax({
        url: 'http://localhost:8080/chat',
        type: 'POST',
        data: 'chat',
        success: function(data) {
            data.commentsArr.forEach((text, index) => {
                const user = data.usernameArr[index];

                let chat_str = 
                "<div class='flex flex-row border-gray-200 border-b-2 pb-3'>"+
                "<div class='mt-6 h-2/3 self-center w-1/3' id='chatter-username'>"+
                    "<div class='font-bold text-sm pl-2'>"+ user+": " +"</div>"+
                    "<svg id='like-comment' class='cursor-pointer w-7 h-7 hover:bg-gray-200 rounded-md  hover:text-red-300 duration-200 m-2' xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>"+
                        "<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />"+
                    "</svg>"+
                "</div>"+
                "<div class='mt-6 break-all w-2/3' id='chat-comments'>"+
                    "<div class='font-normal text-sm'>"+ text +"</div>"+
                "</div>"+
                "</div>"
            
                $('#chat-usr-post').append(chat_str)
              });
        },
        error: function(data) {
            console.log(data);
        }
    })
})

// global chat hide/show
$('#global-chat-btn').click(function() {
    // nav visible
    if(chatActive == false){
        chatActive = true;
        $('#chat-forum').removeClass('hidden');
    }

    // nav hidden
    else if (chatActive == true) {
        chatActive = false;
        $('#chat-forum').addClass('hidden');
    }
})

// add comment to the chat
$('#chat-submit-btn').click(function(){
    let textArea = $('#chat-textArea').val();
    if(textArea != ""){
        outputChat(textArea);

        $.ajax({
            url: 'http://localhost:8080/addComment',
            type: 'POST',
            data: JSON.stringify({comment: textArea, username: sessionStorage.getItem('username')}),
            contentType: 'application/json',
            success: function(data) {
                console.log("done")
            }
        })
    }
})

// like button animation
$('#like-comment').click(function(){
    $('#like-comment').addClass('text-red-500 hover:text-red-500')
})

function outputChat (text) {
    let username = sessionStorage.getItem('username')
    let chat_str = 
    "<div class='flex flex-row border-gray-200 border-b-2 pb-3'>"+
    "<div class='mt-6 h-2/3 self-center w-3/12' id='chatter-username'>"+
        "<div class='font-bold text-sm pl-2'>"+ username+": " +"</div>"+
        "<svg id='like-comment' class='cursor-pointer w-7 h-7 hover:bg-gray-200 rounded-md  hover:text-red-300 duration-200 m-2' xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>"+
            "<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />"+
        "</svg>"+
    "</div>"+
    "<div class='mt-6 break-all w-9/12' id='chat-comments'>"+
        "<div class='font-normal text-sm'>"+ text +"</div>"+
    "</div>"+
    "</div>"

    $('#chat-usr-post').append(chat_str)
}

// purge chat 
$('#clear-chat-btn').click(function(){
    $.ajax({
        url: 'http://localhost:8080/purgeChat',
        type: 'POST',
        data: 'chat'
    })

    location.reload()
})