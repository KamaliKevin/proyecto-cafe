/**
 * Devuelve un objeto con los datos de un curso
 * @param {number} index Índice del curso
 * @return {object} Objeto con los datos del curso
 */
async function getCourseData(index) {
    await fetch('http://localhost:8000/api/cursos/' + (index + 1))
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });
}


/**
 * Devuelve el índice de un curso
 * @param {string} name Nombre del curso
 * @return {number} Índice del curso
 */
async function getCourseIndex(name) {
    await fetch('http://localhost:8000/api/cursos/')
        // NOTA A BORRAR: Habría que plantear una ruta 'curso' que muestre todos los datos de todos
        // los cursos y así conseguir datos de uno según el nombre
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            return data.findIndex(course => course.name === name);
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });
}