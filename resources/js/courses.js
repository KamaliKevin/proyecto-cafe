let courses = [
    {
        name: "Grado Superior de Desarrollo de Aplicaciones Web",
        grade: "1º",
        shiftTime: "Tarde"
    },
    {
        name: "Grado Superior de Desarrollo de Aplicaciones Web",
        grade: "2º",
        shiftTime: "Tarde"
    },
    // NOTA: Se pueden añadir más cursos de ejemplo si se quiere...
];


/**
 * Devuelve un objeto con los datos de un curso
 * @param {number} index Índice del curso
 * @return {object} Objeto con los datos del curso
 */
function getCourseData(index) {
    return courses[index];
}


/**
 * Devuelve el índice de un curso
 * @param {string} name Nombre del curso
 * @return {number} Índice del curso
 */
function getCourseIndex(name) {
    return courses.findIndex(course => course.name === name);
}