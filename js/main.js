// ================== CONSTANTES ===================
const TEACHER_INDEX = getTeacherIndex("Daniel", "Rodríguez Ravelo"); // Índice del profesor/a
const TOTAL_HOURS_LIMIT = 18; // Límite de horas totales a intentar no superar por parte del profesor/a

// ================== VARIABLES ===================
let currentRelationshipData = getAllRelationshipData(TEACHER_INDEX); // Arreglo de objectos de los módulos relacionados


// ================== REFERENCIAS HTML ===================
let firstNameHTML = document.getElementById("firstName");
let lastNameHTML = document.getElementById("lastName");
let departmentHTML = document.getElementById("department");
let specialtyHTML = document.getElementById("specialty");
let schoolYearHTML = document.getElementById("schoolYear");
let subjectContainerHTML = document.getElementById("subjectContainer"); // Contenedor para los acordeones de materias
let totalHoursHTML = document.getElementById("totalHours"); // Horas totales de todos los módulos


// ================== ESTADO INICIAL ===================
showTeacherData(TEACHER_INDEX);
showAllRelationshipData(TEACHER_INDEX);


// ================== EVENTOS FIJOS ===================
subjectContainerHTML.addEventListener("click", function (event) {
    let relationshipRef = getRelationshipRefFromEvent(event);

    if (event.target.classList.contains("btn-danger")
        && event.target.textContent.includes("Eliminar módulo")) {

        deleteRelationshipData(relationshipRef);
    }
    else if (event.target.classList.contains("btn-danger")
        && event.target.textContent.includes("Cancelar cambios")) {

        cancelEditRelationshipData(relationshipRef);
    }
    else if (event.target.classList.contains("btn-warning")
        && event.target.textContent.includes("Guardar cambios")) {

        saveEditRelationshipData(relationshipRef);
    }
    else if (event.target.classList.contains("btn-warning")
        && event.target.textContent.includes("Editar módulo")) {

        editRelationshipData(relationshipRef);
    }
});


// ================== FUNCIONES ===================
/**
 * Guarda los cambios de un módulo relacionado a un profesor/a
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function saveEditRelationshipData(relationshipRef) {
    let specificSubjectEditBtnHTML = document.getElementById(`subject${relationshipRef}EditBtn`);
    let specificSubjectDeleteBtnHTML = document.getElementById(`subject${relationshipRef}DeleteBtn`);
    let specificSubjectTitleHTML = document.getElementById(`subject${relationshipRef}Title`);
    let specificSubjectNameHTML = document.getElementById(`subject${relationshipRef}Name`);
    let specificSubjectDistributionHTML = document.getElementById(`subject${relationshipRef}Distribution`);
    let specificSubjectCommentsHTML = document.getElementById(`subject${relationshipRef}Comments`);

    let specificSubjectIndex = getSubjectIndex(specificSubjectNameHTML.value);
    let specificTeacherSubjectIndex = getRelationshipIndex(relationshipRef);

    specificSubjectTitleHTML.textContent = specificSubjectNameHTML.value;
    specificSubjectNameHTML.disabled = true;
    specificSubjectDistributionHTML.disabled = true;
    specificSubjectCommentsHTML.disabled = true;

    specificSubjectNameHTML.removeEventListener("change", specificSubjectNameHTML.customToggleRelationShipDataRef);
    delete specificSubjectNameHTML.customToggleRelationShipDataRef;

    specificSubjectEditBtnHTML.innerHTML = "<i class='fa-solid fa-pen-to-square'></i> Editar módulo";
    specificSubjectDeleteBtnHTML.innerHTML = "<i class='fa-solid fa-trash'></i> Eliminar módulo";

    setTeacherSubjectData(specificTeacherSubjectIndex, TEACHER_INDEX, specificSubjectIndex,
        specificSubjectDistributionHTML.value, specificSubjectCommentsHTML.value);

    updateAllRelationshipData(TEACHER_INDEX);
}


/**
 * Cancela editar un módulo relacionado a un profesor/a y devuelve los antiguos valores
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function cancelEditRelationshipData(relationshipRef) {
    let specificSubjectEditBtnHTML = document.getElementById(`subject${relationshipRef}EditBtn`);
    let specificSubjectDeleteBtnHTML = document.getElementById(`subject${relationshipRef}DeleteBtn`);
    let specificSubjectNameHTML = document.getElementById(`subject${relationshipRef}Name`);
    let specificSubjectShiftTimeHTML = document.getElementById(`subject${relationshipRef}ShiftTime`);
    let specificSubjectGradeHTML = document.getElementById(`subject${relationshipRef}Grade`);
    let specificSubjectCourseNameHTML = document.getElementById(`subject${relationshipRef}CourseName`);
    let specificSubjectClassroomHTML = document.getElementById(`subject${relationshipRef}Classroom`);
    let specificSubjectHoursHTML = document.getElementById(`subject${relationshipRef}Hours`);
    let specificSubjectDistributionHTML = document.getElementById(`subject${relationshipRef}Distribution`);
    let specificSubjectCommentsHTML = document.getElementById(`subject${relationshipRef}Comments`);

    let originalRelationshipData = getRelationshipData(getRelationshipIndex(relationshipRef));

    specificSubjectNameHTML.value = originalRelationshipData.name;
    specificSubjectShiftTimeHTML.value = originalRelationshipData.shiftTime;
    specificSubjectGradeHTML.value = originalRelationshipData.grade;
    specificSubjectCourseNameHTML.value = originalRelationshipData.courseName;
    specificSubjectClassroomHTML.value = originalRelationshipData.classroom;
    specificSubjectHoursHTML.value = originalRelationshipData.hours;
    specificSubjectDistributionHTML.value = originalRelationshipData.distribution;
    specificSubjectCommentsHTML.value = originalRelationshipData.comments;

    specificSubjectNameHTML.disabled = true;
    specificSubjectDistributionHTML.disabled = true;
    specificSubjectCommentsHTML.disabled = true;

    specificSubjectNameHTML.removeEventListener("change", specificSubjectNameHTML.customToggleRelationShipDataRef);
    delete specificSubjectNameHTML.customToggleRelationShipDataRef;

    specificSubjectEditBtnHTML.innerHTML = "<i class='fa-solid fa-pen-to-square'></i> Editar módulo";
    specificSubjectDeleteBtnHTML.innerHTML = "<i class='fa-solid fa-trash'></i> Eliminar módulo";
}

/**
 * Deja editar un módulo relacionado a un profesor/a
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function editRelationshipData(relationshipRef) {
    let specificSubjectEditBtnHTML = document.getElementById(`subject${relationshipRef}EditBtn`);
    let specificSubjectDeleteBtnHTML = document.getElementById(`subject${relationshipRef}DeleteBtn`);
    let specificSubjectNameHTML = document.getElementById(`subject${relationshipRef}Name`);
    let specificSubjectDistributionHTML = document.getElementById(`subject${relationshipRef}Distribution`);
    let specificSubjectCommentsHTML = document.getElementById(`subject${relationshipRef}Comments`);

    specificSubjectNameHTML.disabled = false;
    specificSubjectDistributionHTML.disabled = false;
    specificSubjectCommentsHTML.disabled = false;

    let toggleRelationshipDataRef = () => toggleRelationshipData(relationshipRef);
    specificSubjectNameHTML.addEventListener("change", toggleRelationshipDataRef);
    specificSubjectNameHTML.customToggleRelationShipDataRef = toggleRelationshipDataRef;

    specificSubjectEditBtnHTML.innerHTML = "<i class='fa-solid fa-floppy-disk'></i> Guardar cambios";
    specificSubjectDeleteBtnHTML.innerHTML = "<i class='fa-solid fa-circle-xmark'></i> Cancelar cambios";
}


/**
 * Borra un módulo relacionado a un profesor/a
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function deleteRelationshipData(relationshipRef){
    let specificSubjectContainerHTML = document.getElementById(`subject${relationshipRef}Container`);

    let specificSubjectNameHTML = document.getElementById(`subject${relationshipRef}Name`);
    let specificSubjectIndex = getSubjectIndex(specificSubjectNameHTML.value);
    let specificTeacherSubjectIndex = getTeacherSubjectIndex(TEACHER_INDEX, specificSubjectIndex);

    specificSubjectContainerHTML.remove();

    deleteTeacherSubjectData(specificTeacherSubjectIndex);
    updateAllRelationshipData(TEACHER_INDEX, true);
}

/**
 * Cambia los datos de un módulo relacionado de acuerdo al valor actual del campo "Módulo"
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function toggleRelationshipData(relationshipRef) {
    let specificSubjectNameHTML = document.getElementById(`subject${relationshipRef}Name`);
    let specificSubjectShiftTimeHTML = document.getElementById(`subject${relationshipRef}ShiftTime`);
    let specificSubjectGradeHTML = document.getElementById(`subject${relationshipRef}Grade`);
    let specificSubjectCourseNameHTML = document.getElementById(`subject${relationshipRef}CourseName`);
    let specificSubjectClassroomHTML = document.getElementById(`subject${relationshipRef}Classroom`);
    let specificSubjectHoursHTML = document.getElementById(`subject${relationshipRef}Hours`);

    let newSubjectData = getSubjectData(getSubjectIndex(specificSubjectNameHTML.value));
    specificSubjectShiftTimeHTML.value = newSubjectData.shiftTime;
    specificSubjectGradeHTML.value = newSubjectData.grade;
    specificSubjectCourseNameHTML.value = newSubjectData.courseName;
    specificSubjectClassroomHTML.value = newSubjectData.classroom;
    specificSubjectHoursHTML.value = newSubjectData.hours;
}

/**
 * Muestra todos los módulos relacionados a un profesor/a
 * @param {number} teacherIndex Índice del profesor/a
 * @return {void}
 */
function showAllRelationshipData(teacherIndex) {
    let totalHours = 0;
    currentRelationshipData.forEach(relationship => {
        subjectContainerHTML.innerHTML += `<div class="accordion-item" id="subject${relationship.ref}Container">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#subject${relationship.ref}Data" aria-expanded="false" 
                        aria-controls="subject${relationship.ref}Data" id="subject${relationship.ref}Title">
                    ${relationship.name}
                </button>
            </h2>
            <div id="subject${relationship.ref}Data" class="accordion-collapse collapse" data-bs-parent="#subjectContainer">
                <div class="accordion-body">
                    <form id="subject${relationship.ref}Form">
                        <div class="mb-3">
                            <label for="subject${relationship.ref}Name" class="form-label">Módulo</label>
                            <select class="form-select" id="subject${relationship.ref}Name" 
                            name="subject${relationship.ref}Name" disabled>
                                <!-- Aquí van todos los nombres de módulos -->
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="subject${relationship.ref}ShiftTime" class="form-label">Turno</label>
                            <input type="text" class="form-control" id="subject${relationship.ref}ShiftTime" 
                            name="subject${relationship.ref}ShiftTime" value="${relationship.shiftTime}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${relationship.ref}Grade" class="form-label">Grado</label>
                            <input type="text" class="form-control" id="subject${relationship.ref}Grade" 
                            name="subject${relationship.ref}Grade" value="${relationship.grade}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${relationship.ref}CourseName" class="form-label">Ciclo</label>
                            <input type="text" class="form-control" id="subject${relationship.ref}CourseName" 
                            name="subject${relationship.ref}CourseName" value="${relationship.courseName}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${relationship.ref}Classroom" class="form-label">Aula</label>
                            <input type="text" class="form-control" id="subject${relationship.ref}Classroom" 
                            name="subject${relationship.ref}Classroom" value="${relationship.classroom}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${relationship.ref}Hours" class="form-label">Horas semanales</label>
                            <input type="text" class="form-control" id="subject${relationship.ref}Hours" 
                            name="subject${relationship.ref}Hours" value="${relationship.hours}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${relationship.ref}Distribution" class="form-label">Distribución semanal</label>
                            <input type="text" class="form-control" id="subject${relationship.ref}Distribution" 
                            name="subject${relationship.ref}Distribution" value="${relationship.distribution}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${relationship.ref}Comments" class="form-label">Comentarios</label>
                            <textarea class="form-control" id="subject${relationship.ref}Comments" 
                            name="subject${relationship.ref}Comments" rows="5" disabled>${relationship.comments}</textarea>
                        </div>
                    </form>
                    <button type="button" class="btn btn-warning" id="subject${relationship.ref}EditBtn">
                        <i class="fa-solid fa-pen-to-square"></i> Editar módulo
                    </button>
                    <button type="button" class="btn btn-danger" id="subject${relationship.ref}DeleteBtn">
                        <i class="fa-solid fa-trash"></i> Eliminar módulo
                    </button>
                </div>
            </div>
        </div>`;

        subjects.forEach(subject => {
            let subjectNameHTML = document.createElement("option");
            subjectNameHTML.value = subject.name;
            subjectNameHTML.textContent = subject.name;
            if(subject.name === relationship.name){
                subjectNameHTML.selected = true;
            }
            subjectContainerHTML.querySelector(`#subject${relationship.ref}Name`).appendChild(subjectNameHTML);
        });

        totalHours += relationship.hours;
    });

    totalHoursHTML.textContent = totalHours;
}


/**
 * Consigue un módulo relacionado a un profesor/a
 * @param {number} relationshipIndex Índice del módulo relacionado
 * @return {object} Objeto del módulo relacionado
 * */
function getRelationshipData(relationshipIndex) {
    return currentRelationshipData[relationshipIndex];
}


/**
 * Devuelve el índice de un módulo relacionado a un profesor/a
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {object} Índice del módulo relacionado
 * */
function getRelationshipIndex(relationshipRef) {
    return currentRelationshipData.findIndex(relationship => relationship.ref === relationshipRef);
}

/**
 * Actualiza todos los módulos relacionados a un profesor/a
 * @param {number} teacherIndex Índice del profesor/a
 * @param {boolean} isDeleting Indica si se está actualizando por borrar módulos relacionados o no.
 * En caso afirmativo, poner "true" (sin comillas)
 * @return {void}
 */
function updateAllRelationshipData(teacherIndex, isDeleting = false) {
    currentRelationshipData = getAllRelationshipData(teacherIndex);

    if(isDeleting){
        // Actualizamos las referencias de los contenedores para los módulos relacionados:
        let allRelationshipRefs = currentRelationshipData.map(relationship => relationship.ref);
        let relationshipRefCount = 0;
        Array.from(subjectContainerHTML.children).forEach(child => {
            let childIdRef = child.id.match(/\d+/)[0];
            child.outerHTML = child.outerHTML.replace(new RegExp(childIdRef, "g"), allRelationshipRefs[relationshipRefCount].toString());
            relationshipRefCount++;
        });
    }
}


/**
 * Consigue todos los módulos relacionados a un profesor/a
 * @param {number} teacherIndex Índice del profesor/a
 * @return {object[]} Arreglo de objetos con los módulos relacionados
 */
function getAllRelationshipData(teacherIndex) {
    let data = [];
    let allRelationshipData = getAllTeacherSubjectData(teacherIndex);

    let relationshipCount = 1;
    allRelationshipData.forEach(relationship => {
        let dataItem = {};
        let subjectData = getSubjectData(relationship.subjectIndex);
        dataItem.ref = relationshipCount;
        dataItem.name = subjectData.name;
        dataItem.shiftTime = subjectData.shiftTime;
        dataItem.grade = subjectData.grade;
        dataItem.courseName = subjectData.courseName;
        dataItem.classroom = subjectData.classroom;
        dataItem.hours = subjectData.hours;
        dataItem.distribution = relationship.distribution;
        dataItem.comments = relationship.comments;
        data.push(dataItem);
        relationshipCount++;
    });

    return data;
}


/**
 * Obtiene la referencia númerica de un módulo relacionado al profesor/a a partir de un evento
 * @param event El evento con el que se obtiene la referencia numérica
 * @return {number|null} Devuelve la referencia numérica si el evento contiene un ID; devuelve "null" en el caso contrario
 */
function getRelationshipRefFromEvent(event) {
    let match = event.target.id.match(/\d+/);
    return match ? Number(match[0]) : null;
}


/**
 * Muestra los datos de un profesor/a
 * @param {number} teacherIndex Índice de un profesor/a
 * @return {void}
 */
function showTeacherData(teacherIndex) {
    let data = getTeacherData(teacherIndex);

    firstNameHTML.value = data.firstName;
    lastNameHTML.value = data.lastName;
    departmentHTML.value = data.department;
    specialtyHTML.value = data.specialty;

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let nextYear = currentYear + 1;

    schoolYearHTML.value = `${currentYear}-${nextYear}`;
}