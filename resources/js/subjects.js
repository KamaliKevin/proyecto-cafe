let subjects = [
    {
        name: "Lenguajes de marcas y gestión de la información",
        courseIndex: 0,
        classroom: "19",
        hours: 6,
        specialtyIndex: 0,
        teacherIndex: 0,
        distribution: "2+2+2",
        comments: ""
    },
    {
        name: "Programación",
        courseIndex: 0,
        classroom: "19",
        hours: 8,
        specialtyIndex: 0,
        teacherIndex: null,
        distribution: "",
        comments: ""
    },
    {
        name: "Desarrollo web en entorno cliente",
        courseIndex: 1,
        classroom: "21",
        hours: 7,
        specialtyIndex: 0,
        teacherIndex: 0,
        distribution: "3+2+2",
        comments: "- Evitar días partidos, teniendo días de mañana o de tarde<br>- No trabajar el viernes tarde"
    }
    // NOTA: Se pueden añadir más módulos de ejemplo si se quiere...
];


/**
 * Actualiza / añade una relación de profesor/a y módulo en la base de datos.
 * Si no se quiere actualizar o añadir alguna propiedad, se pone una cadena vacía ("") para evitar que se actualice o se añada.
 * @param {number} subjectIndex Índice del módulo
 * @param {number|string} newTeacherIndex Índice del profesor/a
 * @param {string} newDistribution Distribución semanal de las horas
 * @param {string} newComments Comentarios adicionales
 * @return {void}
 */
function setRelationshipData(subjectIndex, newTeacherIndex = "", newDistribution = "", newComments = "") {
    if (newTeacherIndex !== "") subjects[subjectIndex].teacherIndex = newTeacherIndex;
    if (newDistribution !== "") subjects[subjectIndex].distribution = newDistribution;
    if (newComments !== "") subjects[subjectIndex].comments = newComments;
}


/**
 * Borra una relación de profesor/a y módulo en la base de datos.
 * @param {number} subjectIndex Índice del módulo
 * @return {void}
 */
function deleteRelationshipData(subjectIndex) {
    subjects[subjectIndex].teacherIndex = null;
    subjects[subjectIndex].distribution = "";
    subjects[subjectIndex].comments = "";
}


/**
 * Devuelve los datos de un módulo
 * @param {number} index Índice del módulo
 * @return {object} Objeto con los datos de dicho módulo
 */
function getSubjectData(index) {
    return subjects[index];
}


/**
 * Devuelve el índice de un módulo
 * @param {string} name Nombre del módulo
 * @return {number} Índice del módulo
 */
function getSubjectIndex(name) {
    return subjects.findIndex(subject => subject.name === name);
}