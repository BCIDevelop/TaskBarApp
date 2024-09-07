const title = document.getElementById("title");
const description = document.getElementById("description");
const submitbutton = document.querySelector(".btn-submit");

class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export const createTask = () => {
  let titlevalue = title.value;
  let descriptionvalue = description.value;
  let newTask = new Task(titlevalue, descriptionvalue);

  console.log(titlevalue);
  console.log(descriptionvalue);
  console.log(newTask);

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

submitbutton.addEventListener("click", (event) => {
  event.preventDefault();
  createTask();
});
