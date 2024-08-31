function showNavBar() {
    document.getElementById("navbar").classList.add("menu-show");
    document.getElementById("nav-overlay").classList.add("overlay-show");
}
function closeNavBar() {
    document.getElementById("nav-overlay").classList.remove("overlay-show");
    document.getElementById("navbar").classList.remove("menu-show");
}
function showFilter() {
    document.querySelector(".filters-container").classList.toggle("visible");
    document.querySelector(".orderby-container").classList.remove("visible");
}
function showOrderBy() {
    document.querySelector(".orderby-container").classList.toggle("visible");
    document.querySelector(".filters-container").classList.remove("visible");
}
function showCreateTask() {
    document
        .getElementById("create-task-overlay")
        .classList.add("overlay-show");
}
function closeCreateTask() {
    document
        .getElementById("create-task-overlay")
        .classList.remove("overlay-show");
}
