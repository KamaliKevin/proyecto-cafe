let subjects = [
    {
        id: 1,
        name: "Desarrollo web en entorno cliente",
        shiftTime: "Tarde",
        grade: "2º",
        courseName: "Grado Superior de Desarrollo de Aplicaciones Web",
        classroom: "21",
        hours: 7
    },
    {
        id: 2,
        name: "Lenguaje de marcas y gestión de la información",
        shiftTime: "Tarde",
        grade: "1º",
        courseName: "Grado Superior de Desarrollo de Aplicaciones Web",
        classroom: "19",
        hours: 6
    },
    {
        id: 3,
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
* @param {number} id ID del módulo
 * @return {object} Objeto con los datos de dicho módulo
*/
function getSubjectData(id) {
    return subjects[id-1];
}


/**
 * Devuelve un número que representa el ID de un módulo
 * @param {string} name Nombre del módulo
 * @return {number} ID del módulo
 */
function getSubjectId(name) {
    return subjects.findIndex((subject) => subject.name == name) + 1
}