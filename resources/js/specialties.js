/**
 * Devuelve un objeto con los datos de una especialidad
 * @param {number} index Índice de la especialidad
 * @return {object} Objeto con los datos de la especialidad
 */
async function getSpecialtyData(index) {
    await fetch('http://localhost:8000/api/especialidades/' + (index + 1))
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
 * Devuelve el índice de una especialidad
 * @param {string} name Nombre de la especialidad
 * @return {number} Índice de la especialidad
 */
async function getSpecialtyIndex(name) {
    await fetch('http://localhost:8000/api/especialidades/')
        // NOTA A BORRAR: Habría que plantear una ruta 'especialidades' que muestre todos los datos de todos
        // las especialidades y así conseguir datos de uno según el nombre
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            return data.findIndex(specialty => specialty.name === name);
        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });
}