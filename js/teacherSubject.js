let teacherSubjects = [
    {
        teacherIndex: 0,
        subjectIndex: 0,
        distribution: "3+2+2",
        comments: "- Evitar días partidos, teniendo días de mañana o de tarde<br>- No trabajar el viernes tarde"
    },
    {
        teacherIndex: 0,
        subjectIndex: 1,
        distribution: "2+2+2",
        comments: "[Sin especificar]"
    },
    {
        teacherIndex: 1,
        subjectIndex: 0,
        distribution: "2+2+2",
        comments: "[Sin especificar]"
    }
    // NOTA: Aquí deberían ir las relaciones entre los módulos y los profesores.
];


/**
 * Devuelve un objeto con los datos de un módulo relacionado al profesor/a
 * @param {number} index Index de la relación
 * @return {object} Objeto con los datos relacionales
 */
function getTeacherSubjectData(index) {
    return teacherSubjects[index];
}


/**
* Devuelve un arreglo de objetos con todos los datos de módulos relacionados al profesor/a
* @param {number} teacherIndex Índice del profesor/a
 * @return {object[]} Arreglo de objetos con datos relacionales
*/
function getAllTeacherSubjectData(teacherIndex) {
    return teacherSubjects.filter(teacherSubject => teacherSubject.teacherIndex === teacherIndex);
}


/**
 * Devuelve el índice de un módulo relacionado al profesor/a
 * @param {number} teacherIndex Índice del profesor/a
 * @param {number} subjectIndex Índice del módulo
 * @return {number} Índice de la relación
 */
function getTeacherSubjectIndex(teacherIndex, subjectIndex) {
    return teacherSubjects.findIndex(teacherSubject =>
        teacherSubject.teacherIndex === teacherIndex
        && teacherSubject.subjectIndex === subjectIndex);
}


/**
* Devuelve un arreglo con todos los índices de las relaciones del profesor/a y un módulo
 * @param {number} teacherIndex Índice del profesor/a
 * @return {number[]} Arreglo de índices de las relaciones del profesor/a y un módulo
*/
function getAllTeacherSubjectIndices(teacherIndex) {
    return teacherSubjects.map((teacherSubject, index) => index);
}


/**
* Devuelve un arreglo con todos los índices de los módulos que imparte un profesor/a
 * @param {number} teacherIndex Índice del profesor/a
 * @return {number[]} Arreglo de índices de módulos
*/
function getAllSubjectIndices(teacherIndex) {
    return teacherSubjects.map(teacherSubject => teacherSubject.subjectIndex);
}


/**
* Añade una nueva relación de profesor/a y módulo a la base de datos.
* Si no se quiere añadir alguna propiedad no obligatoria, se deja una cadena vacía ("") para evitar que se añada
 * @param {number} newTeacherIndex Índice del profesor/a
 * @param {number} newSubjectIndex Índice del módulo
 * @param {string} newDistribution Distribución semanal de las horas
 * @param {string} newComments Comentarios adicionales
 * @return {void}
*/
function addTeacherSubjectData(newTeacherIndex, newSubjectIndex, newDistribution = "", newComments = "") {
    let newData = {};
    let distributionValue = newDistribution ? newDistribution : "[Sin especificar]";
    let commentsValue = newComments ? newComments : "[Sin especificar]";

    newData = {
        teacherIndex: newTeacherIndex,
        subjectIndex: newSubjectIndex,
        distribution: distributionValue,
        comments: commentsValue
    };

    teacherSubjects.push(newData);
}


/**
* Actualiza los datos de una relación de profesor/a y módulo en la base de datos.
* Si no se quiere actualizar alguna propiedad, se deja una cadena vacía ("") para evitar que se actualice.
 * @param {number} index Índice de la relación
 * @param {number|string} newTeacherIndex Índice del profesor/a
 * @param {number|string} newSubjectIndex Índice del módulo
 * @param {string} newDistribution Distribución semanal de las horas
 * @param {string} newComments Comentarios adicionales
 * @return {void}
*/
function setTeacherSubjectData(index, newTeacherIndex = "", newSubjectIndex = "", newDistribution = "", newComments = "") {
    if (newTeacherIndex) teacherSubjects[index].teacherIndex = newTeacherIndex;
    if (newSubjectIndex) teacherSubjects[index].subjectIndex = newSubjectIndex;
    if (newDistribution) teacherSubjects[index].distribution = newDistribution;
    if (newComments) teacherSubjects[index].comments = newComments;
}

/**
* Borra la relación de profesor/a y módulo en la base de datos.
* @param {number} index Index de la relación
*/
function deleteTeacherSubjectData(index) {
    teacherSubjects.splice(index, 1);
}