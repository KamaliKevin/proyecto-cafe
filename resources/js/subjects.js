/**
 * Actualiza / añade una relación de profesor/a y módulo en la base de datos.
 * Si no se quiere actualizar o añadir alguna propiedad, se pone una cadena vacía ("") para evitar que se actualice o se añada.
 * @param {number} subjectIndex Índice del módulo
 * @param {number|string} newTeacherIndex Índice del profesor/a
 * @param {string} newDistribution Distribución semanal de las horas
 * @param {string} newComments Comentarios adicionales
 * @return {void}
 */
/*
function setRelationshipData(subjectIndex, newTeacherIndex = "", newDistribution = "", newComments = "") {
    if (newTeacherIndex !== "") subjects[subjectIndex].teacherIndex = newTeacherIndex;
    if (newDistribution !== "") subjects[subjectIndex].distribution = newDistribution;
    if (newComments !== "") subjects[subjectIndex].comments = newComments;
}

    NOTA A BORRAR: Por favor, sustituir por la función adecuada según la base de datos

 */


/**
 * Borra una relación de profesor/a y módulo en la base de datos.
 * @param {number} subjectIndex Índice del módulo
 * @return {void}
 */
/*
function deleteRelationshipData(subjectIndex) {
    subjects[subjectIndex].teacherIndex = null;
    subjects[subjectIndex].distribution = "";
    subjects[subjectIndex].comments = "";
}
    NOTA A BORRAR: Por favor, sustituir por la función adecuada según la base de datos

/**
 * Devuelve los datos de un módulo
 * @param {number} index Índice del módulo
 * @return {object} Objeto con los datos de dicho módulo
 */


/**
 * Devuelve el índice de un módulo
 * @param {string} name Nombre del módulo
 * @return {number} Índice del módulo
 */
async function getSubjectIndex(name) {
    await fetch('http://localhost:8000/api/modulos/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            return data.findIndex(subject => subject.name === name);
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });
}


/**
 * Devuelve los datos de todos los módulos
 * @return {object[]} Arreglo de objetos de todos los módulos
 */
async function getAllSubjectData() {
    await fetch('http://localhost:8000/api/modulos/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });
}



/**
 * Devuelve los datos de un módulo
 * @param {number} index Índice del módulo
 * @return {object} Objeto con los datos de dicho módulo
 */
async function getSubjectData(index) {
    await fetch('http://localhost:8000/api/modulos/' + (index + 1))
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });
}