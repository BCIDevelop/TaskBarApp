function showNavBar() {
    document.getElementById("navbar").classList.add("menu-show");
    document.getElementById("nav-overlay").classList.add("overlay-show");
}
function closeNavBar() {
    document.getElementById("nav-overlay").classList.remove("overlay-show");
    document.getElementById("navbar").classList.remove("menu-show");
}
