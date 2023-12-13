let departments = [
    {
        name: "Informática y comunicaciones"
    }
    // NOTA: Se pueden añadir más departamentos de ejemplo si se quiere...
];


/**
 * Devuelve un objeto con los datos de un departamento
 * @param {number} index Índice del departamento
 * @return {object} Objeto con los datos de dicho departamento
 */
function getDepartmentData(index) {
    return departments[index];
}


/**
 * Devuelve un número que representa el índice del departamento
 * @param {string} name Nombre del departamento
 * @return {number} Índice del departamento
 */
function getDepartmentIndex(name) {
    return departments.findIndex(department => department.name === name);
}