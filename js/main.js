// ================== CONSTANTES ===================
const TEACHER_ID = getTeacherId("Daniel", "Rodríguez Ravelo"); // ID del profesor/a (extraído realmente de la BD)
const TOTAL_HOURS_LIMIT = 18; // Límite de horas totales a intentar no superar por parte del profesor/a

// ================== VARIABLES ===================
let currentRelationshipData = getAllRelationshipData(TEACHER_ID); // Arreglo de objectos de los módulos relacionados


// ================== REFERENCIAS HTML ===================
let firstNameHTML = document.getElementById("firstName");
let lastNameHTML = document.getElementById("lastName");
let departmentHTML = document.getElementById("department");
let specialtyHTML = document.getElementById("specialty");
let schoolYearHTML = document.getElementById("schoolYear");
let subjectContainerHTML = document.getElementById("subjectContainer"); // Contenedor para los acordeones de materias
let totalHoursHTML = document.getElementById("totalHours"); // Horas totales de todos los módulos


// ================== ESTADO INICIAL ===================
showTeacherData(TEACHER_ID);
showAllRelationshipData(TEACHER_ID);


// ================== EVENTOS FIJOS ===================
// Eventos relacionados a los botones de "Editar módulo" y "Eliminar módulo":
subjectContainerHTML.addEventListener("click", function(event) {
    // Ver si el elemento clicado es un botón de borrado de módulo:
    if (event.target.classList.contains("btn-danger")
        && event.target.textContent.includes("Eliminar módulo")) {
        // Extraer el número del módulo del ID de dicho botón:
        let relationshipNumber = Number(event.target.id.match(/\d+/)[0]);

        // Limpiar dicho módulo:
        deleteRelationshipData(relationshipNumber);
    }

    // Ver si el elemento clicado es un botón de cancelar cambios de módulo:
    if(event.target.classList.contains("btn-danger")
        && event.target.textContent.includes("Cancelar cambios")){
        let relationshipNumber = Number(event.target.id.match(/\d+/)[0]);

        // Cancelar los cambios del módulo:
        cancelEditRelationshipData(relationshipNumber);
    }


    // Ver si el elemento clicado es un botón de edición de módulo:
    if(event.target.classList.contains("btn-warning")){
        let relationshipNumber = Number(event.target.id.match(/\d+/)[0]);

        // Editar dicho módulo:
        editRelationshipData(relationshipNumber);
    }
});


// ================== FUNCIONES ===================
/**
 * Cancela editar un módulo relacionado a un profesor/a y devuelve los antiguos valores
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function cancelEditRelationshipData(relationshipRef) {
    let specificSubjectEditBtnHTML = document.getElementById(`subject${relationshipRef}EditBtn`);
    let specificSubjectDeleteBtnHTML = document.getElementById(`subject${relationshipRef}DeleteBtn`);
    let specificSubjectNameHTML = document.getElementById(`subject${relationshipRef}Name`);
    let specificSubjectDistributionHTML = document.getElementById(`subject${relationshipRef}Distribution`);
    let specificSubjectCommentsHTML = document.getElementById(`subject${relationshipRef}Comments`);

    let originalRelationshipData = getRelationshipData(TEACHER_ID, relationshipRef);

    specificSubjectNameHTML.value = originalRelationshipData.name;
    specificSubjectDistributionHTML.value = originalRelationshipData.distribution;
    specificSubjectCommentsHTML.value = originalRelationshipData.comments;

    specificSubjectNameHTML.disabled = true;
    specificSubjectDistributionHTML.disabled = true;
    specificSubjectCommentsHTML.disabled = true;

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

    specificSubjectEditBtnHTML.innerHTML = "<i class='fa-solid fa-floppy-disk'></i> Guardar cambios";
    specificSubjectDeleteBtnHTML.innerHTML = "<i class='fa-solid fa-circle-xmark'></i> Cancelar cambios";
    specificSubjectNameHTML.disabled = false;
    specificSubjectDistributionHTML.disabled = false;
    specificSubjectCommentsHTML.disabled = false;
}


/**
 * Borra un módulo relacionado a un profesor/a
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function deleteRelationshipData(relationshipRef){
    let specificSubjectContainerHTML = document.getElementById(`subject${relationshipRef}Container`);

    let specificSubjectNameHTML = document.getElementById(`subject${relationshipRef}Name`);
    let specificSubjectId = getSubjectId(specificSubjectNameHTML.value);
    let specificTeacherSubjectId = getTeacherSubjectId(TEACHER_ID, specificSubjectId);

    specificSubjectContainerHTML.remove();

    deleteTeacherSubjectData(specificTeacherSubjectId);
}


/**
 * Muestra todos los módulos relacionados a un profesor/a
 * @param {number} teacherId ID del profesor/a
 * @return {void}
 */
function showAllRelationshipData(teacherId) {
    let data = getAllRelationshipData(teacherId);

    let totalHours = 0;
    data.forEach(relationship => {
        subjectContainerHTML.innerHTML += `<div class="accordion-item" id="subject${relationship.ref}Container">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#subject${relationship.ref}Data" aria-expanded="false" 
                        aria-controls="subject${relationship.ref}Data">
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
 * @param {number} teacherId ID del profesor/a
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {object} Objeto del módulo relacionado
 * */
function getRelationshipData(teacherId, relationshipRef) {
    let data = {};
    let allRelationshipData = getAllRelationshipData(teacherId);
    allRelationshipData.forEach(relationship => {
        if(relationship.ref === relationshipRef){
            data = relationship;
        }
    });

    return data;
}


/**
 * Consigue todos los módulos relacionados a un profesor/a
 * @param {number} teacherId ID del profesor/a
 * @return {object[]} Arreglo de objetos con los módulos relacionados
 */
function getAllRelationshipData(teacherId) {
    let data = [];
    let allRelationshipData = getAllTeacherSubjectData(teacherId);

    let relationshipCount = 1;
    allRelationshipData.forEach(relationship => {
        let dataItem = {};
        let subjectData = getSubjectData(relationship.subjectId);
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
 * Muestra los datos de un profesor/a
 * @param {number} teacherId ID de un profesor/a
 * @return {void}
 */
function showTeacherData(teacherId) {
    let data = getTeacherData(teacherId);

    firstNameHTML.value = data.firstName;
    lastNameHTML.value = data.lastName;
    departmentHTML.value = data.department;
    specialtyHTML.value = data.specialty;

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let nextYear = currentYear + 1;

    schoolYearHTML.value = `${currentYear}-${nextYear}`;
}