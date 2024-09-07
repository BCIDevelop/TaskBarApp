import { Task } from "../model/task.js";
import { filterTasks } from "../service/task.js";
import { saveSingleObject } from "../storage/localStorage.js";
import {formatDateToString} from "../utils/formatDate.js";

const contentCard = document.getElementById("cards__container-wrapper");

const taskCategory = {
  personal: "Personal",
  work: "Trabajo",
  studies: "Estudios",
  community: "Comunidad",
  others: "Otros",
}

const taskStatus = {
  completed: "Completado",
  pending: "Pendiente",
  in_progress: " En Progreso",
}

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
    <div class="card card__${task.category}">
      <div class="card__body">
        <div class="card__details">
          <div class="card__tags">
            <div class="card__tag card__tag-category--${task.category}">${taskCategory[task.category]}</div>
            <div class="card__tag card__tag-status--${task.status}">${taskStatus[task.status]}</div>
          </div>
          <p class="card__date">${formatDateToString(new Date(task.startDate))}</p>
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


export function showTasks() {
  // Solo para pruebas , se eliminara cuando se integre creacion de tarea
  const tasks = [
    new Task({
      ownerId: "2",
      title: "Tarea 1",
      description: "Desc 1",
      status: "pending",
      category: "personal",
      startDate: new Date(),
      endDate: "06-10-2024",
      participants: ["1"],
    }),
    new Task({
      ownerId: "2",
      title: "Tarea 2",
      description: "Desc 2",
      status: "completed",
      category: "work",
      startDate: new Date(),
      endDate: "06-10-2024",
      participants: ["3", "2"],
    }),
    new Task({
      ownerId: "2",
      title: "Tarea 3",
      description: "Desc 3",
      status: "in_progress",
      category: "studies",
      startDate: new Date(),
      endDate: "06-10-2024",
      participants: ["2"],
    }),
  ];  
  saveSingleObject("tasks", tasks);  
  //
  const data = filterTasks("2")
  renderTasks(data)
}