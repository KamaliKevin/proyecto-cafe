/**
 * Devuelve un objeto con los datos de un departamento
 * @param {number} index Índice del departamento
 * @return {object} Objeto con los datos de dicho departamento
 */
async function getDepartmentData(index) {
    await fetch('http://localhost:8000/api/departamentos/' + (index + 1))
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            showTeacherData(data.id - 1);
            return data;
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });
}


/**
 * Devuelve un número que representa el índice del departamento
 * @param {string} name Nombre del departamento
 * @return {number} Índice del departamento
 */
async function getDepartmentIndex(name) {
    await fetch('http://localhost:8000/api/departamentos')
        // NOTA A BORRAR: Habría que plantear una ruta 'profesores' que muestre todos los datos de todos
        // los profesores y así conseguir datos de uno según la combinación de su nombre y apellidos
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            return data.findIndex(department => department.name === name);
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });
}