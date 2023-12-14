// ==================== CONSTANTES ======================
const DEPARTMENT_INDEX = getDepartmentIndex("Informática y comunicaciones");


// ==================== REFERENCIAS HTML ======================
let departmentSchedulesBtnHTML = document.getElementById("departmentSchedulesBtn");
let departmentSchedulesHTML = document.getElementById("departmentSchedules");


// ==================== EVENTOS ======================
departmentSchedulesBtnHTML.addEventListener("click", function () {
    showAllScheduleData();
    departmentSchedulesBtnHTML.disabled = true;
});


// ==================== ESTADO INICIAL ======================
// ???


// ==================== FUNCIONES ======================
/**
 * Enseña todos los datos de los horarios de los profesores de un departamento
 * @return {void}
 */
function showAllScheduleData() {
    const RELATIONSHIP_PROPERTY_PATTERN = /^relationship\d+$/;
    let allScheduleData = getAllScheduleData(DEPARTMENT_INDEX);

    allScheduleData.forEach(schedule => {
        departmentSchedulesHTML.innerHTML += `<div class="mb-5" id="teacher${schedule.ref}Schedule">
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

                departmentSchedulesHTML.querySelector(`#teacher${schedule.ref}Rows`).appendChild(row);
            }
        }
    });
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