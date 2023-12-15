// ==================== CONSTANTES ======================
const DEPARTMENT_INDEX = getDepartmentIndex("Informática y comunicaciones");
const RELATIONSHIP_PROPERTY_PATTERN = /^relationship\d+$/;


// ==================== REFERENCIAS HTML ======================
let departmentSchedulesBtnHTML = document.getElementById("departmentSchedulesBtn");
let departmentWarnedTeachersBtnHTML = document.getElementById("departmentWarnedTeachersBtn");
let departmentDataHTML = document.getElementById("departmentData");


// ==================== EVENTOS ======================
departmentSchedulesBtnHTML.addEventListener("click", showAllScheduleData);
departmentWarnedTeachersBtnHTML.addEventListener("click", showAllWarnedTeacherData);


// ==================== ESTADO INICIAL ======================
// ???


// ==================== FUNCIONES ======================
/**
 * Muestra los datos de los profesores que no cumplen o sobrepasan las 18 horas semanales
 * @return {void}
 */
function showAllWarnedTeacherData() {
    departmentDataHTML.innerHTML = "";
    let allWarnedTeacherData = getAllWarnedTeacherData();

    allWarnedTeacherData.forEach(teacher => {
        if(teacher.totalHours < 18 || teacher.totalHours > 18){
            departmentDataHTML.innerHTML += `<p>
                <span class="fw-bold">${teacher.name}:</span> <span class="fw-bold text-danger">${teacher.totalHours} horas</span>
            </p>`;
        }
    });

    departmentWarnedTeachersBtnHTML.disabled = true;
    departmentSchedulesBtnHTML.disabled = false;
}


/**
 * Consigue un arreglo de objetos de los profesores que no cumplen o sobrepasan las 18 horas semanales
 * @return {object[]} Arreglos de objetos con los datos de dichos profesores
 */
function getAllWarnedTeacherData() {
    let allScheduleData = getAllScheduleData(DEPARTMENT_INDEX);
    let allWarnedTeacherData = [];
    allScheduleData.forEach(schedule => {
        let data = {};
        let totalHours = 0;
        for (const [key, value] of Object.entries(schedule)) {
            if(RELATIONSHIP_PROPERTY_PATTERN.test(key)){
                totalHours += value.hours;
            }
        }
        data.name = schedule.teacherName;
        data.totalHours = totalHours;
        allWarnedTeacherData.push(data);
    });

    return allWarnedTeacherData;
}


/**
 * Enseña todos los datos de los horarios de los profesores de un departamento
 * @return {void}
 */
function showAllScheduleData() {
    departmentDataHTML.innerHTML = "";
    let allScheduleData = getAllScheduleData(DEPARTMENT_INDEX);

    allScheduleData.forEach(schedule => {
        departmentDataHTML.innerHTML += `<div class="mb-5" id="teacher${schedule.ref}Schedule">
            <p class="fw-bold" id="teacher${schedule.ref}Name">${schedule.teacherName}:</p>
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
                <tbody id="teacher${schedule.ref}Rows">
                    <!-- Aquí van cada uno de los módulos relacionados a un profesor/a, en formato fila de tabla -->
                </tbody>
            </table>
        </div>`;

        for (const [key, value] of Object.entries(schedule)) {
            if(RELATIONSHIP_PROPERTY_PATTERN.test(key)){
                let row = document.createElement("tr");
                row.innerHTML = `<td>${value.course.shiftTime}</td>
                <td>${value.course.grade + " " + value.course.name}</td>
                <td>${value.name}</td>
                <td>${value.hours}</td>
                <td>${value.distribution}</td>
                <td>${value.classroom}</td>`;

                departmentDataHTML.querySelector(`#teacher${schedule.ref}Rows`).appendChild(row);
            }
        }
    });

    departmentSchedulesBtnHTML.disabled = true;
    departmentWarnedTeachersBtnHTML.disabled = false;
}


/**
 * Devuelve un arreglo de objetos con todos los datos de los horarios de los profesores de un departamento
 * más una referencia numérica para cada horario
 * @param {number} departmentIndex Índice del departamento
 * @return {object[]} Arreglo de objetos con datos relacionales
 */
function getAllScheduleData(departmentIndex) {
    let filteredTeachers = teachers.filter(teacher => teacher.departmentIndex === departmentIndex);
    let filteredData = [];

    for(let i = 0; i < filteredTeachers.length; i++){
        let relationshipData = getAllRelationshipData(i);
        relationshipData.ref = i + 1;
        relationshipData.teacherName = filteredTeachers[i].firstName + " " + filteredTeachers[i].lastName;
        filteredData.push(relationshipData);
    }

    return filteredData;
}


/**
 * Devuelve un objeto con subobjetos con todos los datos de módulos relacionados al profesor/a
 * @param {number} teacherIndex Índice del profesor/a
 * @return {object} Objetos con subobjetos con datos relacionales
 */
function getAllRelationshipData(teacherIndex) {
    let filteredData = subjects.filter(subject => subject.teacherIndex === teacherIndex);

    return filteredData.reduce((acc, relationship, index) => {
        const {courseIndex, specialtyIndex, teacherIndex, ...rest} = relationship;
        let courseData = getCourseData(courseIndex);

        const propertyName = `relationship${index + 1}`;
        acc[propertyName] = {
            ...rest,
            course: {
                index: courseIndex,
                name: courseData.name,
                grade: courseData.grade,
                shiftTime: courseData.shiftTime
            },
            specialty: {
                index: specialtyIndex,
                name: getSpecialtyData(specialtyIndex).name
            }
        };

        return acc;
    }, {});
}