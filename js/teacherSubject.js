let teacherSubjects = [
    {
        id: 1,
        teacherId: 1,
        subjectId: 1,
        distribution: "3+2+2",
        comments: "- Evitar días partidos, teniendo días de mañana o de tarde<br>- No trabajar el viernes tarde"
    }
    // NOTA: Aquí deberían ir las relaciones entre los módulos y los profesores.
];


/**
 * Devuelve un objeto con los datos de un módulo relacionado al profesor/a
 * @param {number} teacherId ID del profesor/a
 * @param {number} subjectId ID del módulo
 * @return {object} Objeto con los datos relacionales
 */
function getTeacherSubjectData(teacherId, subjectId) {
    let data = {};

    teacherSubjects.forEach(relationship => {
        if(relationship.teacherId === teacherId && relationship.subjectId === subjectId){
            data = relationship;
        }
    });

    return data;
}


/**
* Devuelve un arreglo de objetos con todos los datos de módulos relacionados al profesor/a
* @param {number} teacherId ID del profesor/a
 * @return {object[]} Arreglo de objetos con datos relacionales
*/
function getAllTeacherSubjectData(teacherId) {
    let data = [];

    teacherSubjects.forEach(relationship => {
        if(relationship.teacherId === teacherId){
            data.push(relationship);
        }
    });

    return data;
}


/**
* Devuelve un arreglo con todos los IDs de las relaciones del profesor/a y un módulo
 * @param {number} teacherId ID del profesor/a
 * @return {number[]} Arreglo de IDs de las relaciones del profesor/a y un módulo
*/
function getTeacherSubjectIds(teacherId){
    let data = getAllTeacherSubjectData(teacherId);
    let ids = [];

    data.forEach(relationship => {
        if(relationship.teacherId === teacherId){
            ids.push(relationship.id);
        }
    });

    return ids;
}


/**
* Devuelve un arreglo con todos los IDs de los módulos que imparte un profesor/a
 * @param {number} teacherId ID del profesor/a
 * @return {number[]} Arreglo de IDs de módulos
*/
function getTeacherSubjectId(teacherId){
    let data = getAllTeacherSubjectData(teacherId);
    let ids = [];

    data.forEach(relationship => {
        if(relationship.teacherId === teacherId){
            ids.push(relationship.subjectId);
        }
    });

    return ids;
}


/**
* Añade una nueva relación de profesor/a y módulo a la base de datos.
* Si no se quiere añadir alguna propiedad no obligatoria, se deja una cadena vacía ("") para evitar que se añada
* @param {number} newId ID de la relación
 * @param {number} newTeacherId ID del profesor/a
 * @param {number} newSubjectId ID del módulo
 * @param {string} newDistribution Distribución semanal de las horas
 * @param {string} newComments Comentarios adicionales
 * @return {void}
*/
function addTeacherSubjectData(newId, newTeacherId, newSubjectId, newDistribution = "", newComments = "") {
    let newData = {};
    let distributionValue = newDistribution ? newDistribution : "[Sin especificar]";
    let commentsValue = newComments ? newComments : "[Sin especificar]";

    newData = {
        id: newId,
        teacherId: newTeacherId,
        subjectId: newSubjectId,
        distribution: distributionValue,
        comments: commentsValue
    };

    teacherSubjects.push(newData);
}


/**
* Actualiza los datos de una relación de profesor/a y módulo en la base de datos.
* Si no se quiere actualizar alguna propiedad, se deja una cadena vacía ("") para evitar que se actualice.
 * @param {number} id ID de la relación
 * @param {number|string} newTeacherId ID del profesor/a
 * @param {number|string} newSubjectId ID del módulo
 * @param {string} newDistribution Distribución semanal de las horas
 * @param {string} newComments Comentarios adicionales
 * @return {void}
*/
function setTeacherSubjectData(id, newTeacherId = "", newSubjectId = "", newDistribution = "", newComments = "") {
    teacherSubjects.forEach(relationship => {
        if(relationship.id === id){
            if(newTeacherId) relationship.teacherId = newTeacherId;
            if(newSubjectId) relationship.subjectId = newSubjectId;
            if(newDistribution) relationship.distribution = newDistribution;
            if(newComments) relationship.comments = newComments;
        }
    });
}


/**
* Borra la relación de profesor/a y módulo en la base de datos.
* @param {number} id ID de la relación
*/
function deleteTeacherSubjectData(id) {
    teacherSubjects.forEach(relationship => {
        if(relationship.id === id){
            teacherSubjects.splice(id - 1, 1);
        }
    });
}