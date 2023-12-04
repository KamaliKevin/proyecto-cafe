let subjects = [
    {
        name: "Desarrollo web en entorno cliente",
        shiftTime: "Tarde",
        grade: "2º",
        courseName: "Grado Superior de Desarrollo de Aplicaciones Web",
        classroom: "21",
        hours: 7
    },
    {
        name: "Lenguaje de marcas y gestión de la información",
        shiftTime: "Tarde",
        grade: "1º",
        courseName: "Grado Superior de Desarrollo de Aplicaciones Web",
        classroom: "19",
        hours: 6
    },
    {
        name: "Programación",
        shiftTime: "Tarde",
        grade: "1º",
        courseName: "Grado Superior de Desarrollo de Aplicaciones Web",
        classroom: "19",
        hours: 8
    }
    // NOTA: Se pueden añadir más módulos de ejemplo si se quiere...
];


/**
* Devuelve un objeto con los datos de un módulo
* @param {number} index Índice del módulo
 * @return {object} Objeto con los datos de dicho módulo
*/
function getSubjectData(index) {
    return subjects[index];
}


/**
 * Devuelve un número que representa el índice de un módulo
 * @param {string} name Nombre del módulo
 * @return {number} Índice del módulo
 */
function getSubjectIndex(name) {
    return subjects.findIndex(subject => subject.name === name);
}