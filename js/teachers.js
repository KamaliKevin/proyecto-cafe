let teachers = [
    {
        firstName: "Daniel",
        lastName: "Rodríguez Ravelo",
        department: "Informática y comunicaciones",
        specialty: "Sistemas y aplicaciones informáticas"
    }
    // NOTA: Se pueden añadir más profesores de ejemplo si se quiere...
];


/**
 * Devuelve un objeto con los datos de un profesor/a
 * @param {number} index Índice del profesor/a
 * @return {object} Objeto con los datos de dicho profesor/a
 */
function getTeacherData(index) {
    return teachers[index];
}


/**
 * Devuelve un número que representa el índice del profesor/a
 * @param {string} firstName Nombre del profesor/a
 * @param {string} lastName Apellidos del profesor/a
 * @return {number} Índice del profesor
 */
function getTeacherIndex(firstName, lastName) {
    return teachers.findIndex(teacher => teacher.firstName === firstName && teacher.lastName === lastName);
}