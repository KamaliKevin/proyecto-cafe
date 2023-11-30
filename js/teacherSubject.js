let teacherSubjects = [
    {
        id: 1,
        teacherId: 1,
        subjectId: 1,
        distribution: "3+2+2",
        comments: "- Evitar días partidos, teniendo días de mañana o de tarde<br>- No trabajar el viernes tarde"
    },
    {
        id: 2,
        teacherId: 1,
        subjectId: 2,
        distribution: "2+2+2",
        comments: "[Sin especificar]"
    }
    // NOTA: Aquí deberían ir las relaciones entre los módulos y los profesores.
];


/**
 * Devuelve un objeto con los datos de un módulo relacionado al profesor/a
 * @param {number} id ID de la relación
 * @return {object} Objeto con los datos relacionales
 */
function getTeacherSubjectData(id) {
    let data = {};

    teacherSubjects.forEach(teacherSubject => {
        if(teacherSubject.id === id){
            data = teacherSubject;
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

    teacherSubjects.forEach(teacherSubject => {
        if(teacherSubject.teacherId === teacherId){
            data.push(teacherSubject);
        }
    });

    return data;
}


/**
 * Devuelve el ID de un módulo relacionado al profesor/a
 * @param {number} teacherId ID del profesor/a
 * @param {number} subjectId ID del módulo
 * @return {number} ID de la relación
 */
function getTeacherSubjectId(teacherId, subjectId) {
    let id = 0;

    teacherSubjects.forEach(teacherSubject => {
        if(teacherSubject.teacherId === teacherId && teacherSubject.subjectId === subjectId){
            id = teacherSubject.id;
        }
    });

    return id;
}


/**
* Devuelve un arreglo con todos los IDs de las relaciones del profesor/a y un módulo
 * @param {number} teacherId ID del profesor/a
 * @return {number[]} Arreglo de IDs de las relaciones del profesor/a y un módulo
*/
function getAllTeacherSubjectIds(teacherId){
    let data = getAllTeacherSubjectData(teacherId);
    let ids = [];

    data.forEach(teacherSubject => {
        if(teacherSubject.teacherId === teacherId){
            ids.push(teacherSubject.id);
        }
    });

    return ids;
}


/**
* Devuelve un arreglo con todos los IDs de los módulos que imparte un profesor/a
 * @param {number} teacherId ID del profesor/a
 * @return {number[]} Arreglo de IDs de módulos
*/
function getAllSubjectIds(teacherId){
    let data = getAllTeacherSubjectData(teacherId);
    let ids = [];

    data.forEach(teacherSubject => {
        if(teacherSubject.teacherId === teacherId){
            ids.push(teacherSubject.subjectId);
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
    teacherSubjects.forEach(teacherSubject => {
        if(teacherSubject.id === id){
            if(newTeacherId) teacherSubject.teacherId = newTeacherId;
            if(newSubjectId) teacherSubject.subjectId = newSubjectId;
            if(newDistribution) teacherSubject.distribution = newDistribution;
            if(newComments) teacherSubject.comments = newComments;
        }
    });
}


/**
* Borra la relación de profesor/a y módulo en la base de datos.
* @param {number} id ID de la relación
*/
function deleteTeacherSubjectData(id) {
    teacherSubjects = teacherSubjects.filter(teacherSubject => teacherSubject.id !== id);
}