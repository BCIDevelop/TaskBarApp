import { clearInputs,clearIdDelete } from "./task.js";
import { filterTasks } from "../service/task.js";
import { getSelectedFilters, renderTasks, showTasks } from "./task.js";
import { getSingleObject } from "../storage/localStorage.js";

const currentUser = getSingleObject('user') 

export function showModalTask() {
    const taskOverlay = document.getElementById("create-task-overlay");
    taskOverlay.classList.add("overlay-show");
}
export function showModalDelete() {
    const taskDelete = document.getElementById("delete-task-overlay");
    taskDelete.classList.add("overlay-show");
}
document.addEventListener("DOMContentLoaded", function () {
    const taskOverlay = document.getElementById("create-task-overlay");
    const deleteOverlay = document.getElementById("delete-task-overlay");
    const closeModalButton = document.getElementById("close-modal-task");
    const cancelModalDelete = document.getElementById("cancel-modal-delete");
    const closeModalDelete = document.getElementById("close-modal-delete");
    const btnCloseNav = document.getElementById("btn_close_nav");
    const btnShowNav = document.getElementById("btn_show-nav");
    const navOverlay = document.getElementById("nav-overlay");
    const btnFilter = document.getElementById("button_filter");
    const btnOrderBy = document.getElementById("button_orderby");
    const btnCreateTask = document.getElementById("btn_create_task");
    btnCreateTask.addEventListener("click", () => showModalTask());
    btnOrderBy?.addEventListener("click", () => {
        document
            .querySelector(".orderby-container")
            .classList.toggle("visible");
        document
            .querySelector(".filters-container")
            .classList.remove("visible");
    });

    btnFilter?.addEventListener("click", () => {
        document
            .querySelector(".filters-container")
            .classList.toggle("visible");
        document
            .querySelector(".orderby-container")
            .classList.remove("visible");
    });
    navOverlay?.addEventListener("click", () => {
        document.getElementById("nav-overlay").classList.remove("overlay-show");
        document.getElementById("navbar").classList.remove("menu-show");
    });
    btnCloseNav?.addEventListener("click", () => {
        document.getElementById("nav-overlay").classList.remove("overlay-show");
        document.getElementById("navbar").classList.remove("menu-show");
    });
    btnShowNav?.addEventListener("click", () => {
        document.getElementById("navbar").classList.add("menu-show");
        document.getElementById("nav-overlay").classList.add("overlay-show");
    });
    taskOverlay?.addEventListener("click", function (event) {
        if (event.target.id === "create-task-overlay") {
            taskOverlay.classList.remove("overlay-show");
            clearInputs();
        }
    });
    deleteOverlay?.addEventListener("click", function (event) {
        if (event.target.id === "delete-task-overlay") {
            deleteOverlay.classList.remove("overlay-show");
            clearIdDelete();
        }
    });
    closeModalDelete?.addEventListener("click", function () {
        deleteOverlay.classList.remove("overlay-show");
        clearIdDelete();
    });
    cancelModalDelete?.addEventListener("click", function () {
        deleteOverlay.classList.remove("overlay-show");
        clearIdDelete();
    });
    closeModalButton?.addEventListener("click", function () {
        taskOverlay.classList.remove("overlay-show");
        clearInputs();
    });
});

const buttoncreatetask = document.querySelector(".button__createtask");

buttoncreatetask?.addEventListener("click", function () {
    document
        .getElementById("create-task-overlay")
        .classList.add("overlay-show");
});

// FILTER TASK
document
    .querySelectorAll('input[name="task-category"], input[name="task-status"]')
    .forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const filters = getSelectedFilters();
            const userId = currentUser.user_id;
            const data = filterTasks(
                userId,
                filters.status,
                filters.categories
            );
            renderTasks(data);
        });
    });

// LOAD TASK
showTasks(currentUser.user_id);
