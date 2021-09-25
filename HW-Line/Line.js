let header = document.querySelector(".main-nav");
let header_nav_a = document.querySelectorAll(".main-nav nav a");
let after = document.querySelector(".main-nav nav a:first-child:after");
let lang = document.querySelector("#lang");
window.addEventListener("scroll",() =>{
    if (window.pageYOffset != 0){
        header.style.backgroundColor = "rgba(0,0,0,.7)";
        // after.style.backgroundColor = "white";
        lang.style.color = "white";
        header_nav_a.forEach(x => {
            x.style.color = "white";
        })
        
    }
    else {
        header.style = "";
        header_nav_a.forEach(x => {
            x.style.color = "";
        })
    }
})