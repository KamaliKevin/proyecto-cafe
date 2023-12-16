// ================= CONSTANTES ====================
const DEFAULT_STUDY_OPTION = "-- Elija un departamento --";
const HOUR_LIMIT_PER_CLASSROOM = 30;


// ================= REFERENCIAS HTML ====================
let departmentsHTML = document.getElementById("departments");
let hoursPerShiftTimeBtnHTML = document.getElementById("hoursPerShiftTimeBtn");
let studyDataHTML = document.getElementById("studyData"); // Datos del departamento o el aula


// ================= ESTADO INICIAL ====================
showAllStudyNames();


// ================= EVENTOS ====================
departmentsHTML.addEventListener("change", toggleStudyData);
hoursPerShiftTimeBtnHTML.addEventListener("click", showAllHoursPerShiftTime);

// ================= FUNCIONES ====================
/**
 * Muestra el total de horas asignadas por aula,
 * diciendo tanto las de mañana como las de tarde
 * @return {void}
 */
function showAllHoursPerShiftTime() {
    studyDataHTML.innerHTML = "";

    let allHoursPerShiftTime = getAllHoursPerShiftTime();
    allHoursPerShiftTime.forEach(classroom => {
        studyDataHTML.innerHTML += `<div class="mb-5">
            <p class="fw-bold">Aula ${classroom.classroom}:</p>
            <ul>
                <li><span class="fw-bold">Mañana:</span> <span id="classroom${classroom.classroom}morningHours">${classroom.morningHours} horas</span></li>
                <li><span class="fw-bold">Tarde:</span> <span id="classroom${classroom.classroom}eveningHours">${classroom.eveningHours} horas</span></li>
                <li><span class="fw-bold">Total de horas: </span> <span id="classroom${classroom.classroom}totalHours">${classroom.morningHours + classroom.eveningHours} horas</span></li>
            </ul>
        </div>`;

        if(classroom.morningHours + classroom.eveningHours > HOUR_LIMIT_PER_CLASSROOM){
            let totalHoursHTML = studyDataHTML.querySelector(`#classroom${classroom.classroom}totalHours`);
            console.log(totalHoursHTML);
            totalHoursHTML.classList.add("fw-bold", "text-danger");
            totalHoursHTML.textContent += " (límite de horas por aula superado)";
        }
    });

    hoursPerShiftTimeBtnHTML.disabled = true;
}


/**
 * Consigue un arreglo de objetos con el total de horas asignadas por aula,
 * diciendo tanto las de mañana como las de tarde
 * @return {object[]} Arreglos de objetos, cada uno teniendo el aula y las horas asignadas (mañana y tarde)
 */
function getAllHoursPerShiftTime() {
    let allStudyData = getAllStudyData();
    let data = [];

    // Crear un mapa para almacenar las horas de mañana y tarde por aula:
    let classroomMap = new Map();

    allStudyData.forEach(study => {
        Object.keys(study).forEach(key => {
            // Comprobar si la propiedad representa al módulo relacionado (ejemplos: "relationship1", "relationship2", ...)
            if (RELATIONSHIP_PROPERTY_PATTERN.test(key)) {
                let relationship = study[key];
                let classroom = relationship.classroom;
                let shiftTime = relationship.course.shiftTime;
                let hours = relationship.hours;

                // Inicializa la entrada del aula en el mapa si esta no existe:
                if (!classroomMap.has(classroom)) {
                    classroomMap.set(classroom, { morningHours: 0, eveningHours: 0 });
                }

                // Actualiza las horas acumuladas basadas en "shiftTime":
                if (shiftTime === 'Mañana') {
                    classroomMap.get(classroom).morningHours += hours;
                }
                else if (shiftTime === 'Tarde') {
                    classroomMap.get(classroom).eveningHours += hours;
                }
            }
        });
    });

    // Convertir las entradas en el mapa a un arreglo de objetos:
    classroomMap.forEach((hours, classroom) => {
        data.push({
            classroom: classroom,
            morningHours: hours.morningHours,
            eveningHours: hours.eveningHours
        });
    });

    return data;
}


/**
 * Cambia los datos del departamento según lo que elija el/la jefe de estudios
 * @return {void}
 */
function toggleStudyData() {
    let allStudyDataNames = Array.from(departmentsHTML.children);
    allStudyDataNames.forEach(child => {
        if(child.selected === true){
            studyDataHTML.innerHTML = "";
            showStudyData(child.value);
        }
    });

    hoursPerShiftTimeBtnHTML.disabled = false;
}


/**
 * Enseña los datos de un departamento concreto
 * @param {string} departmentName Nombre del departamento
 * @return {void}
 */
function showStudyData(departmentName) {
    studyDataHTML.innerHTML = "";

    let filteredStudyData = getAllStudyData().filter(study => study.departmentName === departmentName);
    filteredStudyData.forEach(study => {
        studyDataHTML.innerHTML += `<div class="mb-5" id="teacher${study.ref}Schedule">
            <p class="fw-bold" id="teacher${study.ref}Name">${study.teacherName}:</p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Turno</th>
                        <th>Curso y ciclo</th>
                        <th>Módulo</th>
                        <th>Horas</th>
                        <th>Distribución semanal</th>
                        <th>Aula o taller</th>
                    </tr>
                </thead>
                <tbody id="teacher${study.ref}Rows">
                    <!-- Aquí van cada uno de los módulos relacionados a un profesor/a, en formato fila de tabla -->
                </tbody>
            </table>
        </div>`;

        for (const [key, value] of Object.entries(study)) {
            if(RELATIONSHIP_PROPERTY_PATTERN.test(key)){
                let row = document.createElement("tr");
                row.innerHTML = `<td>${value.course.shiftTime}</td>
                <td>${value.course.grade + " " + value.course.name}</td>
                <td>${value.name}</td>
                <td>${value.hours}</td>
                <td>${value.distribution}</td>
                <td>${value.classroom}</td>`;

                studyDataHTML.querySelector(`#teacher${study.ref}Rows`).appendChild(row);
            }
        }
    });
}


/**
 * Rellena la selección de departamentos con los nombres correspondientes
 * @return {void}
 */
function showAllStudyNames() {
    let allStudyData = getAllStudyData();
    allStudyData.forEach(study => {
        let studyOptionHTML = document.createElement("option");
        studyOptionHTML.value = study.departmentName;
        studyOptionHTML.textContent = study.departmentName;
        departmentsHTML.appendChild(studyOptionHTML);
    });
}


/**
 * Devuelve un arreglo de objetos con todos los datos de los horarios de los profesores
 * más una referencia numérica para cada horario
 * @return {object[]} Arreglo de objetos con datos relacionales
 */
function getAllStudyData() {
    let filteredData = [];

    for(let i = 0; i < getAllTeacherData().length; i++){
        let relationshipData = getAllDepartmentRelationshipData(i);
        relationshipData.ref = i + 1;
        relationshipData.teacherName = getAllTeacherData()[i].name + " " + getAllTeacherData()[i].lastName;
        relationshipData.departmentName = getDepartmentData(getAllTeacherData()[i].departamento_id - 1).name;
        filteredData.push(relationshipData);
    }

    return filteredData;
}