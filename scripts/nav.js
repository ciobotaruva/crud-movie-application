//MOBILE NAV
function openMenu(){
    //OPEN MENU
    const mobileMenu = document.querySelector("ul");
    mobileMenu.classList.toggle("open");
    
    //HAMBURGER CHANGE TO X
    const closeMenu = document.querySelector(".movies__hamburger");
    closeMenu.classList.toggle("close");
};