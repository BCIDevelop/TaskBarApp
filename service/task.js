import { getSingleObject } from "../storage/localStorage.js";
import formatDate from "../utils/formatDate.js";

export const filterTasksByDate = function (userId, dayClicked) {
    /* Obtenemos el dia con el formato adecuado*/
    const actualDate = new Date();
    actualDate.setDate(actualDate.getDate() + dayClicked + 30);
    /* Formateamos la data */
    const formatedDate = formatDate(actualDate);
    console.log(formatedDate);
    /* Traemos la data del localStorage */
    const tasks = getSingleObject("tasks");
    const taskFiltered = tasks.filter(
        (element) =>
            element.startDate === formatedDate && element.ownerId === userId
    );
    return taskFiltered;
};

export const listTasks = function (userId, options) {
    /* Si no hay opciones de filtrado devolvemos todo */
    if (!options)
        return getSingleObject("tasks").filter(
            (element) => element.ownerId === userId
        );
    const tasks = getSingleObject("tasks");
    const tasksFinded = tasks.filter((element) => {
        if (element.ownerId != userId) return false;
        const keys = Object.keys(options);
        let elementFinded = true;
        for (const key of keys) {
            /* Verificamos que en caso sea title busquemos usando regex */
            if (key === "title") {
                const pattern = new RegExp(`.*${options.title}.*`);
                return pattern.test(element.title);
            }
            if (element[key] !== options[key]) {
                elementFinded = false;
                break;
            }
        }
        return elementFinded;
    });

    return tasksFinded;
};



export function filterTasks(userId, statusFilter = [], categoryFilter = []) {
    const data = getSingleObject("tasks");
    const result = data.filter((task) => {
        const isParticipant = task.ownerId === userId;
        const matchesStatus =
            statusFilter.length === 0 || statusFilter.includes(task.status);
        const matchesCategory =
            categoryFilter.length === 0 ||
            categoryFilter.includes(task.category);
        return isParticipant && matchesStatus && matchesCategory;
    });
    return result;
}
