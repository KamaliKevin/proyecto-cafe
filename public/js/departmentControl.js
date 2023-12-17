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
async function showAllWarnedTeacherData() {
    departmentDataHTML.innerHTML = "";
    let allWarnedTeacherData = await getAllWarnedTeacherData();

    allWarnedTeacherData.forEach(teacher => {
        if (teacher.totalHours < 18 || teacher.totalHours > 18) {
            departmentDataHTML.innerHTML += `<p>
                <span class="fw-bold">${teacher.name} ${teacher.lastName}:</span> <span class="fw-bold text-danger">${teacher.totalHours} horas</span>
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
async function getAllWarnedTeacherData() {
    let allScheduleData = await getAllScheduleData(1);
    let allWarnedTeacherData = [];
    allScheduleData.forEach(schedule => {
        let data = {};
        let totalHours = 0;
        console.log("warning");
        console.log(schedule);
        schedule.teacherSubjects.forEach(element => {
            console.log(element);
            if (element.hours != null) {
                totalHours += element.hours;
            }
        });
        data.name = schedule.teacherName;
        data.lastName = schedule.teacherLastName;
        data.totalHours = totalHours;
        allWarnedTeacherData.push(data);
    });

    return allWarnedTeacherData;
}


/**
 * Enseña todos los datos de los horarios de los profesores de un departamento
 * @return {void}
 */
async function showAllScheduleData() {
    departmentDataHTML.innerHTML = "";
    let allScheduleData = await getAllScheduleData(1);
    allScheduleData.forEach(schedule => {
        console.log("Schedule");
        console.log(schedule);
        departmentDataHTML.innerHTML += `<div class="mb-5" id="teacher${schedule.ref}Schedule">
            <p class="fw-bold" id="teacher${schedule.ref}Name">${schedule.teacherName} ${schedule.teacherLastName}:</p>
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
        schedule.teacherSubjects.forEach(element => {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${element.course.shiftTime}</td>
                <td>${element.course.grade + " " + element.course.name}</td>
                <td>${element.name}</td>
                <td>${element.hours}</td>
                <td>${element.weekDistribution}</td>
                <td>${element.classroom}</td>`;

            departmentDataHTML.querySelector(`#teacher${schedule.ref}Rows`).appendChild(row);
        });

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
async function getAllScheduleData(departmentIndex) {
    let filteredData = [];

    await fetch('http://localhost:8000/api/departamentos/' + departmentIndex)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Le data");
            console.log(data);
            console.log("not le data");
            data.user.forEach(user => {
                let thing = {};

                thing.teacherName = user.name;
                thing.teacherLastName = user.lastName;
                thing.teacherSubjects = [];
                user.modulos.forEach(modulo => {
                    let temporal = {};
                    if (modulo.aulas != null && modulo.aulas.length != 0) {
                        temporal.classroom = modulo.aulas[0].name;
                    }else{
                        temporal.classroom = "";
                    }
                    temporal.comments = modulo.observations;
                    temporal.course = {};
                    temporal.course.grade = modulo.curso.grade;
                    temporal.course.name = modulo.curso.name;
                    temporal.course.shiftTime = modulo.curso.turno;
                    temporal.weekDistribution = modulo.weekDistribution;
                    temporal.hours = modulo.hours;
                    temporal.name = modulo.materia;
                    thing.teacherSubjects.push(temporal);
                });
                filteredData.push(thing);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
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
        const { courseIndex, specialtyIndex, teacherIndex, ...rest } = relationship;
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