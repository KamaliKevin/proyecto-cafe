/**
 * Devuelve un objeto con los datos de un profesor/a
 * @param {number} index Índice del profesor/a
 * @return {object} Objeto con los datos de dicho profesor/a
 */
async function getTeacherData(index) {
    await fetch('http://localhost:8000/api/profesores/' + (index + 1))
        // NOTA A BORRAR: Habría que plantear una ruta 'profesores' que muestre todos los datos de todos
        // los profesores y así conseguir datos de uno según la combinación de su nombre y apellidos
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
 * Devuelve un arreglo de objetos con los datos de todos los profesores
 * @return {object[]} Arreglo de objetos con los datos de dicho profesor/a
 */
async function getAllTeacherData() {
    await fetch('http://localhost:8000/api/profesores/')
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