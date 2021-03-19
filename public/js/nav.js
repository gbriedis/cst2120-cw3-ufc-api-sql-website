let navBtn = document.querySelector('#nav-btn') 
let navToggle = document.querySelector('#nav-toggle')
let navBtnImg = document.querySelector('#nav-btn-img')
let active = false;

$(navBtn).click(function() {
    // nav visible
    if(active == false) {
        active = true;
        $(navToggle).removeClass('transform -translate-x-96 duration-700')
        $(navBtn).addClass('transform translate-x-64 duration-700')
        $(navBtnImg).addClass('transform rotate-180 duration-300')
    }

    // nav hidden
    else if (active == true) {
        active = false;
        $(navToggle).addClass('transform -translate-x-96 duration-700')
        $(navBtn).removeClass('transform -translate-x-64 duration-700')
        $(navBtnImg).removeClass('transform rotate-180 duration-300')
    }
})

