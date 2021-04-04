let chatBtn = document.querySelector('#global-chat-btn') 
let chatForum = document.querySelector('#chat-forum')
let chatActive = false;

// global chat
$(chatBtn).click(function() {
    // nav visible
    if(chatActive == false){
        chatActive = true;
        $(chatForum).removeClass('hidden');
    }


    // nav hidden
    else if (chatActive == true) {
        chatActive = false;
        $(chatForum).addClass('hidden');
    }
})