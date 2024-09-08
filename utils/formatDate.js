const formatDate = function (date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
};

const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

export const formatDateToString = (datestr) => {
    const [year, month, day] = datestr.split('-');
    const date = new Date(year, month - 1, day);
    
    // Opciones para formato de fecha largo
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-PE', options);
};
export default formatDate;
