
const title = document.getElementById("title");
const description = document.getElementById("description");
const categoria = document.getElementById("categoria");
const estado = document.getElementById("estado");
const fechainicio = document.getElementById("fechainicio");
const fechafin = document.getElementById("fechafin");
const submitbutton = document.querySelector(".btn-submit");

class Task {
  constructor(id, title, description, categoria, estado, fechainicio, fechafin) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.categoria = categoria;
    this.estado = estado;
    this.fechainicio = fechainicio;
    this.fechafin = fechafin;
  }
}

export const createTask = () => {
  let taskId = crypto.randomUUID();
  let titlevalue = title.value;
  let descriptionvalue = description.value;
  let categoriavalue = categoria.value;
  let estadovalue = estado.value;
  let fechainiciovalue = fechainicio.value;
  let fechafinvalue = fechafin.value;
  let newTask = new Task(taskId, titlevalue, descriptionvalue, categoriavalue, estadovalue, fechainiciovalue, fechafinvalue);

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

submitbutton.addEventListener("click", (event) => {
  event.preventDefault();
  createTask();
});

