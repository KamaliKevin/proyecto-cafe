let specialties = [
    {
        name: "Sistemas y aplicaciones informáticas"
    }
    // NOTA: Se pueden añadir más especialidades de ejemplo si se quiere...
];


/**
 * Devuelve un objeto con los datos de una especialidad
 * @param {number} index Índice de la especialidad
 * @return {object} Objeto con los datos de la especialidad
 */
function getSpecialtyData(index) {
    return specialties[index];
}


/**
 * Devuelve el índice de una especialidad
 * @param {string} name Nombre de la especialidad
 * @return {number} Índice de la especialidad
 */
function getSpecialtyIndex(name) {
    return specialties.findIndex(specialty => specialty.name === name);
}