import { Task } from "../model/task.js";
import { filterTasks, filterTasksByDate, listTasks } from "../service/task.js";
import { saveSingleObject, getSingleObject } from "../storage/localStorage.js";
import formatDate, { formatDateToString } from "../utils/formatDate.js";
import { showModalDelete, showModalTask } from "./index.js";
let isEditing = false; // Variable para controlar el estado de edición
let editingTaskId = null;

const idTaskInput = document.getElementById("id_task");
const idTaskDelete = document.getElementById("id_task_delete");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const categoriaSelect = document.getElementById("categoria");
const estadoSelect = document.getElementById("estado");
const fechainicioInput = document.getElementById("fechainicio");
const fechafinInput = document.getElementById("fechafin");
const submitButton = document.getElementById("modal-submit");
const contentCard = document.getElementById("cards__container-wrapper");
const submitDelete = document.getElementById("delete-task-button");

export const clearInputs = () => {
    titleInput.value = "";
    descriptionInput.value = "";
    categoriaSelect.value = "personal";
    estadoSelect.value = "pending";
    fechainicioInput.value = "";
    fechafinInput.value = "";
    idTaskInput.value = "";
    isEditing = false;
    editingTaskId = "";
    submitButton.value = "Registrar";
};
export const clearIdDelete = () => {
    idTaskDelete.value = "";
};
function validateForm() {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const category = categoriaSelect.value.trim();
    const status = estadoSelect.value.trim();
    const startDate = fechainicioInput.value.trim();
    const endDate = fechafinInput.value.trim();

    // Verificar campos vacíos
    if (
        !title ||
        !description ||
        !category ||
        !status ||
        !startDate ||
        !endDate
    ) {
        return { valid: false, message: "Todos los campos deben ser llenados" };
    }

    // Verificar si las fechas son válidas
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        return { valid: false, message: "Las fechas deben ser válidas" };
    }

    // Verificar que la fecha de inicio no sea después de la fecha de fin
    if (startDateObj > endDateObj) {
        return {
            valid: false,
            message:
                "La fecha de inicio no puede ser después de la fecha de fin",
        };
    }

    return { valid: true, message: "Formulario válido" };
}
const taskCategory = {
    personal: "Personal",
    work: "Trabajo",
    studies: "Estudios",
    community: "Comunidad",
    others: "Otros",
};

const taskStatus = {
    completed: "Completado",
    pending: "Pendiente",
    in_progress: " En Progreso",
};

export function getSelectedFilters() {
    const selectedCategories = Array.from(
        document.getElementsByName("task-category")
    )
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

    const selectedStatus = Array.from(document.getElementsByName("task-status"))
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
    const result = { categories: selectedCategories, status: selectedStatus };
    return result;
}

export function renderTasks(data) {
    let content = "";
    data.forEach((task) => {
        content += `
        <div class="card card__${task.category}" data-id="${task.id}">
      <div class="card__body">
        <div class="card__details">
          <div class="card__tags">
            <div class="card__tag card__tag-category--${task.category}">${
            taskCategory[task.category]
        }</div>
            <div class="card__tag card__tag-status--${task.status}">${
            taskStatus[task.status]
        }</div>
          </div> 
          <p class="card__date">${formatDateToString(task.startDate)}</p>
          <h2 class="card__title">${task.title}</h2>
        </div>
        <div class="card__buttons">
          <button class="button__task button__task-edit">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="button__task button__task-delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
        `;
    });

    contentCard.innerHTML = content;
}

contentCard?.addEventListener("click", (event) => {
    if (event.target.closest(".button__task-edit")) {
        const taskCard = event.target.closest(".card");
        const taskId = taskCard.dataset.id;
        fillFormWithTask(taskId);
    } else if (event.target.closest(".button__task-delete")) {
        const taskCard = event.target.closest(".card");
        idTaskDelete.value = taskCard.dataset.id;
        showModalDelete();
    }
});

export function showTasks(userId) {
    const data = filterTasks(userId);
    renderTasks(data);
}

export const createTask = () => {
    let ownerId = "1";
    let id = idTaskInput.value;
    let title = titleInput.value;
    let description = descriptionInput.value;
    let status = estadoSelect.value;
    let category = categoriaSelect.value;
    let startDate = fechainicioInput.value;
    let endDate = fechafinInput.value;
    let newTask = new Task({
        id,
        ownerId,
        title,
        description,
        status,
        category,
        startDate,
        endDate,
    });

    let tasks = getSingleObject("tasks");
    tasks.push(newTask);
    saveSingleObject("tasks", tasks);
};
const editTask = (taskId) => {
    let tasks = getSingleObject("tasks");

    // Encuentra el índice de la tarea a editar
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
        let ownerId = "1";
        let title = titleInput.value;
        let description = descriptionInput.value;
        let status = estadoSelect.value;
        let category = categoriaSelect.value;
        let startDate = fechainicioInput.value;
        let endDate = fechafinInput.value;

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ownerId,
            title,
            description,
            status,
            category,
            startDate,
            endDate,
        };

        saveSingleObject("tasks", tasks);
    } else {
        console.error("Task not found");
    }
};
function fillFormWithTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = tasks.find((task) => task.id === taskId);

    if (taskToEdit) {
        titleInput.value = taskToEdit.title;
        descriptionInput.value = taskToEdit.description;
        categoriaSelect.value = taskToEdit.category;
        estadoSelect.value = taskToEdit.status;
        fechainicioInput.value = taskToEdit.startDate;
        fechafinInput.value = taskToEdit.endDate;

        // Cambiar el texto del botón a "Modificar" y activar el modo edición
        submitButton.value = "Modificar";
        isEditing = true;
        editingTaskId = taskId; // Almacena el ID de la tarea que se está editando
        showModalTask();
    } else {
        console.error("Task not found");
    }
}
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (validateForm().valid) {
        if (isEditing && editingTaskId) {
            // Si estamos en modo edición, actualizamos la tarea
            editTask(editingTaskId);
            submitButton.textContent = "Registrar"; // Cambia el texto del botón a 'Registrar' después de la edición
            isEditing = false;
            editingTaskId = null;
        } else {
            createTask();
        }
        clearInputs();
        const taskOverlay = document.getElementById("create-task-overlay");
        taskOverlay.classList.remove("overlay-show");
        renderTasks(getSingleObject("tasks"));
    } else {
    }
});
submitDelete?.addEventListener("click", (event) => {
    event.preventDefault();
    if (idTaskDelete.value) {
        const tasks = getSingleObject("tasks");
        const updatedTasks = tasks.filter(
            (task) => task.id !== idTaskDelete.value
        );
        saveSingleObject("tasks", updatedTasks);
        clearIdDelete();
        const deleteOverlay = document.getElementById("delete-task-overlay");
        deleteOverlay.classList.remove("overlay-show");
    } else {
        console.error("Task not found");
    }
    renderTasks(getSingleObject("tasks"));
});

/* Search Input */
const searchInput = document.querySelector('.search_input_container__search_input')
searchInput.addEventListener("input",event=>{
    const searchedTasks = listTasks(2,{title: event.target.value}) // TODO: CHANGE USER ID FOR USER IN LOCAL STORAGE
    renderTasks(searchedTasks);

})

/* Calendar Section */
const datesElements = document.querySelectorAll('.calendar__day')
const handleCalendarClicked= function(event){
    console.log('clciekd')
    let filteredTaskCalendar =getSingleObject("tasks")
    let positionDate
    event.currentTarget.classList.toggle('calendar__day--active')
    datesElements.forEach((element,index)=>{
        if (element === event.currentTarget) positionDate = index
        else element.classList.remove('calendar__day--active')  
    })
    if(event.currentTarget.classList.contains('calendar__day--active')) { 
        filteredTaskCalendar=filterTasksByDate(2,positionDate)//TODO: CHANGE USER ID
    }
    renderTasks(filteredTaskCalendar);
}
const dayMap = {0:"DOM",1:"LUN",2:"MAR", 3: "MIER",4:"JUEV",5:"VIER",6:"SAB"}
datesElements.forEach((element,index)=>{
    element.addEventListener('click',handleCalendarClicked)
    const month = element.querySelector('.calendar__day-name')
    const number = element.querySelector('.calendar__day-number')
    const actualDate = new Date()
    actualDate.setDate(actualDate.getDate() + index )
    month.textContent= dayMap[actualDate.getDay()]
    number.textContent = actualDate.getDate()

})