import { Task } from "../model/task.js";
import { getList, setList } from "../storage/localStorage.js";
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const categoriaSelect = document.getElementById("categoria");
const estadoSelect = document.getElementById("estado");
const fechainicioInput = document.getElementById("fechainicio");
const fechafinInput = document.getElementById("fechafin");
const submitbutton = document.querySelector(".btn-submit");

const clearInputs = () => {
    titleInput.value = "";
    descriptionInput.value = "";
    categoriaSelect.value = "personal";
    estadoSelect.value = "pendiente";
    fechainicioInput.value = "";
    fechafinInput.value = "";
};
export const createTask = () => {
    let ownerId = 1;
    let title = titleInput.value;
    let description = descriptionInput.value;
    let status = estadoSelect.value;
    let category = categoriaSelect.value;
    let startDate = fechainicioInput.value;
    let endDate = fechafinInput.value;
    let newTask = new Task({
        ownerId,
        title,
        description,
        status,
        category,
        startDate,
        endDate,
    });

    let tasks = getList("tasks");

    tasks.push(newTask);
    setList("tasks", tasks);
};

submitbutton.addEventListener("click", (event) => {
    event.preventDefault();
    createTask();
    clearInputs();
});
