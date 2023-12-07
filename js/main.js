// ================== CONSTANTES ===================
const TEACHER_INDEX = getTeacherIndex("Daniel", "Rodríguez Ravelo"); // Índice del profesor/a
const TOTAL_HOURS_LIMIT = 18; // Límite de horas totales a intentar no superar por parte del profesor/a

// ================== VARIABLES ===================
let currentRelationshipData = getAllRelationshipData(TEACHER_INDEX); // Arreglo de objectos de los módulos relacionados


// ================== REFERENCIAS HTML ===================
let formContentHTML = document.getElementById("formContent"); // Contenedor del formulario
let firstNameHTML = document.getElementById("firstName");
let lastNameHTML = document.getElementById("lastName");
let departmentHTML = document.getElementById("department");
let specialtyHTML = document.getElementById("specialty");
let schoolYearHTML = document.getElementById("schoolYear");
let subjectContainerHTML = document.getElementById("subjectContainer"); // Contenedor para los acordeones de materias
let optionContainer = document.getElementById("optionContainer"); // Contenedor para las opciones del formulario
let addSubjectContainerHTML = document.getElementById("addSubjectContainer"); // Contenedor para añadir módulos
let totalHoursHTML = document.getElementById("totalHours"); // Horas totales de todos los módulos


// ================== ESTADO INICIAL ===================
showTeacherData(TEACHER_INDEX);
showAllRelationshipData();
createAddSubjectBtn();


// ================== EVENTOS FIJOS ===================
formContentHTML.addEventListener("click", function (event) {
    if(event.target.classList.contains("btn-success")
        && event.target.textContent.includes("Añadir módulo")){

        createAddRelationshipDataForm();
    }
});

subjectContainerHTML.addEventListener("click", function (event) {
    let relationshipRef = getRelationshipRefFromEvent(event);

    if (event.target.classList.contains("btn-danger")
        && event.target.textContent.includes("Eliminar módulo")) {

        removeRelationshipData(relationshipRef);
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

addSubjectContainerHTML.addEventListener("click", function (event){
    let relationshipRef = getRelationshipRefFromEvent(event);

    if(event.target.classList.contains("btn-danger")
        && event.target.textContent.includes("Cancelar módulo")){

        cancelAddRelationshipData();
    }
    else if(event.target.classList.contains("btn-success")
        && event.target.textContent.includes("Guardar módulo")){

        saveAddRelationshipData(relationshipRef);
    }
});


// ================== FUNCIONES ===================
/**
 * Guarda los cambios de un módulo relacionado a un profesor/a
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function saveEditRelationshipData(relationshipRef) {
    let specificSubjectFields = getRelationshipFields(relationshipRef);

    let originalRelationshipData = getRelationshipData(getRelationshipIndex(relationshipRef));
    let originalSubjectIndex = getSubjectIndex(originalRelationshipData.name); // index de modulo original
    deleteRelationshipData(originalSubjectIndex);

    let newSubjectIndex = getSubjectIndex(specificSubjectFields.nameHTML.value); // index del modulo nuevo

    specificSubjectFields.titleHTML.textContent = specificSubjectFields.nameHTML.value;
    specificSubjectFields.nameHTML.disabled = true;
    specificSubjectFields.distributionHTML.disabled = true;
    specificSubjectFields.commentsHTML.disabled = true;

    specificSubjectFields.nameHTML.removeEventListener("change", specificSubjectFields.nameHTML.customToggleRelationShipDataRef);
    delete specificSubjectFields.nameHTML.customToggleRelationShipDataRef;

    specificSubjectFields.editBtnHTML.innerHTML = "<i class='fa-solid fa-pen-to-square'></i> Editar módulo";
    specificSubjectFields.deleteBtnHTML.innerHTML = "<i class='fa-solid fa-trash'></i> Eliminar módulo";

    setRelationshipData(newSubjectIndex, TEACHER_INDEX,
        specificSubjectFields.distributionHTML.value, specificSubjectFields.commentsHTML.value);

    updateAllRelationshipData(TEACHER_INDEX);
}


/**
 * Cancela editar un módulo relacionado a un profesor/a y devuelve los antiguos valores
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function cancelEditRelationshipData(relationshipRef) {
    let specificSubjectFields = getRelationshipFields(relationshipRef);

    let originalRelationshipData = getRelationshipData(getRelationshipIndex(relationshipRef));

    specificSubjectFields.nameHTML.value = originalRelationshipData.name;
    specificSubjectFields.shiftTimeHTML.value = originalRelationshipData.shiftTime;
    specificSubjectFields.gradeHTML.value = originalRelationshipData.grade;
    specificSubjectFields.courseNameHTML.value = originalRelationshipData.courseName;
    specificSubjectFields.classroomHTML.value = originalRelationshipData.classroom;
    specificSubjectFields.hoursHTML.value = originalRelationshipData.hours;
    specificSubjectFields.distributionHTML.value = originalRelationshipData.distribution;
    specificSubjectFields.commentsHTML.value = originalRelationshipData.comments;

    specificSubjectFields.nameHTML.disabled = true;
    specificSubjectFields.distributionHTML.disabled = true;
    specificSubjectFields.commentsHTML.disabled = true;

    specificSubjectFields.nameHTML.removeEventListener("change", specificSubjectFields.nameHTML.customToggleRelationShipDataRef);
    delete specificSubjectFields.nameHTML.customToggleRelationShipDataRef;

    specificSubjectFields.editBtnHTML.innerHTML = "<i class='fa-solid fa-pen-to-square'></i> Editar módulo";
    specificSubjectFields.deleteBtnHTML.innerHTML = "<i class='fa-solid fa-trash'></i> Eliminar módulo";
}


/**
 * Deja editar un módulo relacionado a un profesor/a
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function editRelationshipData(relationshipRef) {
    let specificSubjectFields = getRelationshipFields(relationshipRef);

    specificSubjectFields.nameHTML.disabled = false;
    specificSubjectFields.distributionHTML.disabled = false;
    specificSubjectFields.commentsHTML.disabled = false;

    let toggleRelationshipDataRef = () => toggleRelationshipData(relationshipRef);
    specificSubjectFields.nameHTML.addEventListener("change", toggleRelationshipDataRef);
    specificSubjectFields.nameHTML.customToggleRelationShipDataRef = toggleRelationshipDataRef;

    specificSubjectFields.editBtnHTML.innerHTML = "<i class='fa-solid fa-floppy-disk'></i> Guardar cambios";
    specificSubjectFields.deleteBtnHTML.innerHTML = "<i class='fa-solid fa-circle-xmark'></i> Cancelar cambios";
}


/**
 * Quita un módulo relacionado a un profesor/a
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function removeRelationshipData(relationshipRef){
    let specificSubjectContainerHTML = document.getElementById(`subject${relationshipRef}Container`);

    let specificSubjectFields = getRelationshipFields(relationshipRef);
    let specificSubjectIndex = getSubjectIndex(specificSubjectFields.nameHTML.value);

    totalHoursHTML.textContent = (Number(totalHoursHTML.textContent) - Number(specificSubjectFields.hoursHTML.value)).toString();

    specificSubjectContainerHTML.remove();

    deleteRelationshipData(specificSubjectIndex);
    updateAllRelationshipData(TEACHER_INDEX, true);
}


/**
 * Guarda un módulo relacionado nuevo
 * @param {number} relationshipRef Referencia numérica del módulo nuevo
 * @return {void}
 */
function saveAddRelationshipData(relationshipRef) {
    let specificSubjectFields = getRelationshipFields(relationshipRef);

    subjectContainerHTML.innerHTML += `<div class="accordion-item" id="subject${relationshipRef}Container">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#subject${relationshipRef}Data" aria-expanded="false" 
                    aria-controls="subject${relationshipRef}Data" id="subject${relationshipRef}Title">
                ${specificSubjectFields.nameHTML.value}
            </button>
        </h2>
        <div id="subject${relationshipRef}Data" class="accordion-collapse collapse" data-bs-parent="#subjectContainer">
            <div class="accordion-body">
                <form id="subject${relationshipRef}Form">
                    <div class="mb-3">
                        <label for="subject${relationshipRef}Name" class="form-label">Módulo</label>
                        <select class="form-select" id="subject${relationshipRef}Name" 
                        name="subject${relationshipRef}Name" disabled>
                            <!-- Aquí van todos los nombres de módulos -->
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="subject${relationshipRef}ShiftTime" class="form-label">Turno</label>
                        <input type="text" class="form-control" id="subject${relationshipRef}ShiftTime" 
                        name="subject${relationshipRef}ShiftTime" value="${specificSubjectFields.shiftTimeHTML.value}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="subject${relationshipRef}Grade" class="form-label">Grado</label>
                        <input type="text" class="form-control" id="subject${relationshipRef}Grade" 
                        name="subject${relationshipRef}Grade" value="${specificSubjectFields.gradeHTML.value}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="subject${relationshipRef}CourseName" class="form-label">Ciclo</label>
                        <input type="text" class="form-control" id="subject${relationshipRef}CourseName" 
                        name="subject${relationshipRef}CourseName" value="${specificSubjectFields.courseNameHTML.value}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="subject${relationshipRef}Classroom" class="form-label">Aula</label>
                        <input type="text" class="form-control" id="subject${relationshipRef}Classroom" 
                        name="subject${relationshipRef}Classroom" value="${specificSubjectFields.classroomHTML.value}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="subject${relationshipRef}Hours" class="form-label">Horas semanales</label>
                        <input type="text" class="form-control" id="subject${relationshipRef}Hours" 
                        name="subject${relationshipRef}Hours" value="${specificSubjectFields.hoursHTML.value}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="subject${relationshipRef}Distribution" class="form-label">Distribución semanal</label>
                        <input type="text" class="form-control" id="subject${relationshipRef}Distribution" 
                        name="subject${relationshipRef}Distribution" value="${specificSubjectFields.distributionHTML.value}" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="subject${relationshipRef}Comments" class="form-label">Comentarios</label>
                        <textarea class="form-control" id="subject${relationshipRef}Comments" 
                        name="subject${relationshipRef}Comments" rows="5" disabled>${specificSubjectFields.commentsHTML.value}</textarea>
                    </div>
                    <button type="button" class="btn btn-warning" id="subject${relationshipRef}EditBtn">
                        <i class="fa-solid fa-pen-to-square"></i> Editar módulo
                    </button>
                    <button type="button" class="btn btn-danger" id="subject${relationshipRef}DeleteBtn">
                        <i class="fa-solid fa-trash"></i> Eliminar módulo
                    </button>
                </form>
            </div>
        </div>
    </div>`;

    subjects.forEach(subject => {
        let subjectOptionHTML = document.createElement("option");
        subjectOptionHTML.value = subject.name;
        subjectOptionHTML.textContent = subject.name;
        if(subject.name === specificSubjectFields.nameHTML.value){
            subjectOptionHTML.selected = true;
        }
        subjectContainerHTML.querySelector(`#subject${relationshipRef}Name`).appendChild(subjectOptionHTML);
    });


    setRelationshipData(getSubjectIndex(specificSubjectFields.nameHTML.value), TEACHER_INDEX,
        specificSubjectFields.distributionHTML.value, specificSubjectFields.commentsHTML.value);
    updateAllRelationshipData(TEACHER_INDEX);

    totalHoursHTML.textContent = (Number(totalHoursHTML.textContent) + Number(specificSubjectFields.hoursHTML.value)).toString();

    specificSubjectFields.nameHTML.removeEventListener("change", specificSubjectFields.nameHTML.customToggleRelationShipDataRef);
    delete specificSubjectFields.nameHTML.customToggleRelationShipDataRef;

    addSubjectContainerHTML.innerHTML = "";
    createAddSubjectBtn();
}


/**
 * Cancela guardar un módulo relacionado nuevo
 * @return {void}
 */
function cancelAddRelationshipData(){
    addSubjectContainerHTML.innerHTML = "";
    createAddSubjectBtn();
}


/**
 * Crea el formulario para la adición de módulos relacionados a un profesor/a
 * @return {void}
 */
function createAddRelationshipDataForm() {
    deleteAddSubjectBtn();
    let relationshipRef = currentRelationshipData.length + 1;
    addSubjectContainerHTML.innerHTML += `
        <form class="mb-3" id="addSubjectForm">
            <h5>Ponga los datos del nuevo módulo:</h5>
            <div class="mb-3">
                <label for="subject${relationshipRef}Name" class="form-label">Módulo</label>
                <select class="form-select" id="subject${relationshipRef}Name" 
                name="subject${relationshipRef}Name">
                    <!-- Aquí van todos los nombres de módulos -->
                    <option value="-- Elija un módulo --">-- Elija un módulo --</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="subject${relationshipRef}ShiftTime" class="form-label">Turno</label>
                <input type="text" class="form-control" id="subject${relationshipRef}ShiftTime" 
                name="subject${relationshipRef}ShiftTime" disabled>
            </div>
            <div class="mb-3">
                <label for="subject${relationshipRef}Grade" class="form-label">Grado</label>
                <input type="text" class="form-control" id="subject${relationshipRef}Grade" 
                name="subject${relationshipRef}Grade" disabled>
            </div>
            <div class="mb-3">
                <label for="subject${relationshipRef}CourseName" class="form-label">Ciclo</label>
                <input type="text" class="form-control" id="subject${relationshipRef}CourseName" 
                name="subject${relationshipRef}CourseName" disabled>
            </div>
            <div class="mb-3">
                <label for="subject${relationshipRef}Classroom" class="form-label">Aula</label>
                <input type="text" class="form-control" id="subject${relationshipRef}Classroom" 
                name="subject${relationshipRef}Classroom" disabled>
            </div>
            <div class="mb-3">
                <label for="subject${relationshipRef}Hours" class="form-label">Horas semanales</label>
                <input type="text" class="form-control" id="subject${relationshipRef}Hours" 
                name="subject${relationshipRef}Hours" disabled>
            </div>
            <div class="mb-3">
                <label for="subject${relationshipRef}Distribution" class="form-label">Distribución semanal</label>
                <input type="text" class="form-control" id="subject${relationshipRef}Distribution" 
                name="subject${relationshipRef}Distribution">
            </div>
            <div class="mb-3">
                <label for="subject${relationshipRef}Comments" class="form-label">Comentarios</label>
                <textarea class="form-control" id="subject${relationshipRef}Comments" 
                name="subject${relationshipRef}Comments" rows="5"></textarea>
            </div>
            <button type="button" class="btn btn-success" id="subject${relationshipRef}SaveBtn">
                <i class='fa-solid fa-floppy-disk'></i> Guardar módulo
            </button>
            <button type="button" class="btn btn-danger" id="subject${relationshipRef}CancelBtn">
                <i class='fa-solid fa-circle-xmark'></i> Cancelar módulo
            </button>
        </form>`;

    subjects.forEach(subject => {
        let subjectOptionHTML = document.createElement("option");
        subjectOptionHTML.value = subject.name;
        subjectOptionHTML.textContent = subject.name;
        addSubjectContainerHTML.querySelector(`#subject${relationshipRef}Name`).appendChild(subjectOptionHTML);
    });

    let subjectNameHTML = addSubjectContainerHTML.querySelector(`#subject${relationshipRef}Name`);
    let toggleRelationshipDataRef = () => toggleRelationshipData(relationshipRef);
    subjectNameHTML.addEventListener("change", toggleRelationshipDataRef);
    subjectNameHTML.customToggleRelationShipDataRef = toggleRelationshipDataRef;
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
        subjectContainerHTML.innerHTML = "";
        showAllRelationshipData();
    }
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
 * @return {number} Índice del módulo relacionado
 * */
function getRelationshipIndex(relationshipRef) {
    return currentRelationshipData.findIndex(relationship => relationship.ref === relationshipRef);
}


/**
 * Devuelve un arreglo de objetos con todos los datos de módulos relacionados al profesor/a
 * más una referencia numérica
 * @param {number} teacherIndex Índice del profesor/a
 * @return {object[]} Arreglo de objetos con datos relacionales
 */
function getAllRelationshipData(teacherIndex) {
    let count = 1;
    let filteredData = subjects.filter(subject => subject.teacherIndex === teacherIndex);
    return filteredData.map(relationship => {
        const {teacherIndex, ...rest} = relationship;
        return {...rest, ref: count++};
    });
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
 * Consigue todos los elementos HTML de un módulo relacionado
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {object} Objeto con todos elementos HTML del módulo relacionado
 */
function getRelationshipFields(relationshipRef) {
    return {
        titleHTML: document.getElementById(`subject${relationshipRef}Title`),
        nameHTML: document.getElementById(`subject${relationshipRef}Name`),
        shiftTimeHTML: document.getElementById(`subject${relationshipRef}ShiftTime`),
        gradeHTML: document.getElementById(`subject${relationshipRef}Grade`),
        courseNameHTML: document.getElementById(`subject${relationshipRef}CourseName`),
        classroomHTML: document.getElementById(`subject${relationshipRef}Classroom`),
        hoursHTML: document.getElementById(`subject${relationshipRef}Hours`),
        distributionHTML: document.getElementById(`subject${relationshipRef}Distribution`),
        commentsHTML: document.getElementById(`subject${relationshipRef}Comments`),
        editBtnHTML: document.getElementById(`subject${relationshipRef}EditBtn`),
        deleteBtnHTML: document.getElementById(`subject${relationshipRef}DeleteBtn`)
    }
}


/**
 * Elimina el botón de "Añadir módulo":
 */
function deleteAddSubjectBtn() {
    document.querySelector("#addSubjectBtn").remove();
}


/**
 * Crea un botón de "Añadir módulo"
 */
function createAddSubjectBtn() {
    let addSubjectBtnHTML = document.createElement("button");
    addSubjectBtnHTML.type = "button";
    addSubjectBtnHTML.id = "addSubjectBtn";
    addSubjectBtnHTML.name = "addSubjectBtn";
    addSubjectBtnHTML.classList.add("btn", "btn-success");
    addSubjectBtnHTML.innerHTML = "<i class='fa-solid fa-plus text-white'></i> Añadir módulo";
    optionContainer.appendChild(addSubjectBtnHTML);
}


/**
 * Cambia los datos de un módulo relacionado de acuerdo al valor actual del campo "Módulo"
 * @param {number} relationshipRef Referencia numérica del módulo relacionado
 * @return {void}
 */
function toggleRelationshipData(relationshipRef) {
    let specificSubjectFields = getRelationshipFields(relationshipRef);

    if(specificSubjectFields.nameHTML.value === "-- Elija un módulo --"){

        specificSubjectFields.nameHTML.value = "";
        specificSubjectFields.shiftTimeHTML.value = "";
        specificSubjectFields.gradeHTML.value = "";
        specificSubjectFields.courseNameHTML.value = "";
        specificSubjectFields.classroomHTML.value = "";
        specificSubjectFields.hoursHTML.value = "";
    }
    else {
        let newSubjectData = getSubjectData(getSubjectIndex(specificSubjectFields.nameHTML.value));

        specificSubjectFields.nameHTML.value = newSubjectData.name;
        specificSubjectFields.shiftTimeHTML.value = newSubjectData.shiftTime;
        specificSubjectFields.gradeHTML.value = newSubjectData.grade;
        specificSubjectFields.courseNameHTML.value = newSubjectData.courseName;
        specificSubjectFields.classroomHTML.value = newSubjectData.classroom;
        specificSubjectFields.hoursHTML.value = newSubjectData.hours;
    }
}


/**
 * Muestra todos los módulos relacionados a un profesor/a
 * @return {void}
 */
function showAllRelationshipData() {
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
                        <button type="button" class="btn btn-warning" id="subject${relationship.ref}EditBtn">
                            <i class="fa-solid fa-pen-to-square"></i> Editar módulo
                        </button>
                        <button type="button" class="btn btn-danger" id="subject${relationship.ref}DeleteBtn">
                            <i class="fa-solid fa-trash"></i> Eliminar módulo
                        </button>
                    </form>
                </div>
            </div>
        </div>`;

        subjects.forEach(subject => {
            let subjectOptionHTML = document.createElement("option");
            subjectOptionHTML.value = subject.name;
            subjectOptionHTML.textContent = subject.name;
            if(subject.name === relationship.name){
                subjectOptionHTML.selected = true;
            }
            subjectContainerHTML.querySelector(`#subject${relationship.ref}Name`).appendChild(subjectOptionHTML);
        });

        totalHours += relationship.hours;
    });

    totalHoursHTML.textContent = totalHours;
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