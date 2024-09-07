const formatDate = function(date){
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}

const opciones = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
};

export const formatDateToString = (date) => new Intl.DateTimeFormat('es-ES', opciones).format(date);



export default formatDate