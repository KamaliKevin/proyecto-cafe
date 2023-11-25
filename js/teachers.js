let teachers = [
    {
        id: 1,
        firstName: "Daniel",
        lastName: "Rodríguez Ravelo",
        department: "Informática y comunicaciones",
        specialty: "Sistemas y aplicaciones informáticas"
    }
    // NOTA: Se pueden añadir más profesores de ejemplo si se quiere...
];


/**
* Devuelve un objeto con los datos de un profesor/a
* @param {number} id ID del profesor/a
* @return {object} Objeto con los datos de dicho profesor/a
*/
function getTeacherData(id) {
    let data = {};
    teachers.forEach(teacher => {
        if (teacher.id === id) {
            data = teacher;
        }
    });

    return data;
}


/**
 * Devuelve un número que representa el ID del profesor/a
 * @param {string} firstName Nombre del profesor/a
 * @param {string} lastName Apellidos del profesor/a
 * @return {number} ID del profesor
 */
function getTeacherId(firstName, lastName) {
    let id = 0;
    teachers.forEach(teacher => {
        if (teacher.firstName === firstName && teacher.lastName === lastName) {
            id = teacher.id;
        }
    });

    return id;
}