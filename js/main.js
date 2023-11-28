// ================== CONSTANTES ===================
const TEACHER_ID = getTeacherId("Daniel", "Rodríguez Ravelo"); // ID del profesor/a (extraído realmente de la BD)
const TOTAL_HOURS_LIMIT = 18; // Límite de horas totales a intentar no superar por parte del profesor/a


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
showAllTeacherSubjectData(TEACHER_ID);


// ================== EVENTOS FIJOS ===================
// Eventos relacionados a los botones de "Editar módulo" y "Eliminar módulo":
subjectContainerHTML.addEventListener("click", function(event) {
    // Ver si el elemento clicado es un botón de borrado de módulo:
    if (event.target.classList.contains("btn-danger")) {
        // Extraer el número del módulo del ID de dicho botón:
        let teacherSubjectNumber = event.target.id.match(/\d+/)[0];

        // Limpiar dicho módulo:
        clearTeacherSubjectData(teacherSubjectNumber);
    }
});


// ================== FUNCIONES ===================
/**
 * Limpia un módulo relacionado a un profesor/a
 * @param {number} teacherSubjectRef Referencia numérica del módulo
 * @return {void}
 */
function clearTeacherSubjectData(teacherSubjectRef){
    let specificSubjectContainerHTML = document.getElementById(`subject${teacherSubjectRef}Container`);

    if (specificSubjectContainerHTML) {
        specificSubjectContainerHTML.remove();
    }
}

/**
 * Muestra todos los módulos relacionados a un profesor/a
 * @param {number} teacherId ID del profesor/a
 * @return {void}
 */
function showAllTeacherSubjectData(teacherId) {
    let data = [];
    let allTeacherSubjectData = getAllTeacherSubjectData(teacherId);
    allTeacherSubjectData.forEach(relationship => {
        let dataItem = {};
        let subjectData = getSubjectData(relationship.subjectId);
        dataItem.name = subjectData.name;
        dataItem.shiftTime = subjectData.shiftTime;
        dataItem.grade = subjectData.grade;
        dataItem.courseName = subjectData.courseName;
        dataItem.classroom = subjectData.classroom;
        dataItem.hours = subjectData.hours;
        dataItem.distribution = relationship.distribution;
        dataItem.comments = relationship.comments;
        data.push(dataItem);
    });

    let totalHours = 0;
    let teacherSubjectCount = 1;
    data.forEach(relationship => {
        subjectContainerHTML.innerHTML += `<div class="accordion-item" id="subject${teacherSubjectCount}Container">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#subject${teacherSubjectCount}Data" aria-expanded="false" 
                        aria-controls="subject${teacherSubjectCount}Data">
                    Módulo #${teacherSubjectCount}
                </button>
            </h2>
            <div id="subject${teacherSubjectCount}Data" class="accordion-collapse collapse" data-bs-parent="#subjectContainer">
                <div class="accordion-body">
                    <form id="subject${teacherSubjectCount}Form">
                        <div class="mb-3">
                            <label for="subject${teacherSubjectCount}Name" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="subject${teacherSubjectCount}Name" 
                            name="subject${teacherSubjectCount}Name" value="${relationship.name}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${teacherSubjectCount}ShiftTime" class="form-label">Turno</label>
                            <input type="text" class="form-control" id="subject${teacherSubjectCount}ShiftTime" 
                            name="subject${teacherSubjectCount}ShiftTime" value="${relationship.shiftTime}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${teacherSubjectCount}Grade" class="form-label">Grado</label>
                            <input type="text" class="form-control" id="subject${teacherSubjectCount}Grade" 
                            name="subject${teacherSubjectCount}Grade" value="${relationship.grade}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${teacherSubjectCount}CourseName" class="form-label">Ciclo</label>
                            <input type="text" class="form-control" id="subject${teacherSubjectCount}CourseName" 
                            name="subject${teacherSubjectCount}CourseName" value="${relationship.courseName}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${teacherSubjectCount}Classroom" class="form-label">Aula</label>
                            <input type="text" class="form-control" id="subject${teacherSubjectCount}Classroom" 
                            name="subject${teacherSubjectCount}Classroom" value="${relationship.classroom}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${teacherSubjectCount}Hours" class="form-label">Horas semanales</label>
                            <input type="text" class="form-control" id="subject${teacherSubjectCount}Hours" 
                            name="subject${teacherSubjectCount}Hours" value="${relationship.hours}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${teacherSubjectCount}Distribution" class="form-label">Distribución semanal</label>
                            <input type="text" class="form-control" id="subject${teacherSubjectCount}Distribution" 
                            name="subject${teacherSubjectCount}Distribution" value="${relationship.distribution}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="subject${teacherSubjectCount}Comments" class="form-label">Comentarios</label>
                            <textarea class="form-control" id="subject${teacherSubjectCount}Comments" 
                            name="subject${teacherSubjectCount}Comments" rows="5" disabled>${relationship.comments}</textarea>
                        </div>
                    </form>
                    <button type="button" class="btn btn-warning" id="subject${teacherSubjectCount}EditBtn">
                        <i class="fa-solid fa-pen-to-square"></i> Editar módulo
                    </button>
                    <button type="button" class="btn btn-danger" id="subject${teacherSubjectCount}DeleteBtn">
                        <i class="fa-solid fa-trash"></i> Eliminar módulo
                    </button>
                </div>
            </div>
        </div>`;

        totalHours += relationship.hours;
        teacherSubjectCount++;
    });

    totalHoursHTML.textContent = totalHours;
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