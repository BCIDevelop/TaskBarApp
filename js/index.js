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
function closeCreateTask(event) {
    if (
        (event.target && event.target.id === "create-task-overlay") ||
        event.target.id === "close-modal-task"
    ) {
        document
            .getElementById("create-task-overlay")
            .classList.remove("overlay-show");
    }
}
function showCreateTask() {
    document
        .getElementById("create-task-overlay")
        .classList.add("overlay-show");
}

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("create-task-overlay");
    const closeModalButton = document.getElementById("close-modal-task");

    // Cierra el modal si se hace clic en el overlay (fuera del modal)
    overlay.addEventListener("click", function (event) {
        if (event.target.id === "create-task-overlay") {
            overlay.classList.remove("overlay-show");
        }
    });

    // Cierra el modal si se hace clic en el botón de cerrar
    closeModalButton.addEventListener("click", function () {
        overlay.classList.remove("overlay-show");
    });
});
