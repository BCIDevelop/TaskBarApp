/* Funcio que me permite escapar los caracters para mis inputs */
const sanitizeInput= function (inputText){
    const htmlEntities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
      };
    return inputText.replace(/([&<>\"'])/g, match => htmlEntities[match]);

}

export default sanitizeInput