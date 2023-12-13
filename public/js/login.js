// ================== CONSTANTES ===================
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const PASSWORD_PATTERN = "";

// ================== REFERENCIAS HTML ===================
let emailHTML = document.getElementById("email");
let passwordHTML = document.getElementById("password");
let loginBtnHTML = document.getElementById("loginBtn");
let loginFormErrorsHTML = document.getElementById("loginFormErrors");


// ================== EVENTOS FIJOS ===================
loginBtnHTML.addEventListener("click", function () {
    checkLoginData();
    Login();
});


// ================== FUNCIONES ===================
function checkLoginData() {
    loginFormErrorsHTML.innerHTML = "";
    let errorCount = 0;

    if (isOnlyWhitespaceOrEmpty(emailHTML.value) || isOnlyWhitespaceOrEmpty(passwordHTML.value)) {
        loginFormErrorsHTML.innerHTML += `<p class="text-danger">
            <i class="fa-solid fa-circle-xmark text-danger"></i> Todos los datos son obligatorios
        </p>`;
        errorCount++;
    }

    if (!EMAIL_PATTERN.test(emailHTML.value)) {
        loginFormErrorsHTML.innerHTML += `<p class="text-danger">
            <i class="fa-solid fa-circle-xmark text-danger"></i> El correo electrónico no tiene un formato válido
        </p>`;
        errorCount++;
    }

    /* Aquí también iría la lógica para comporbar los datos en la base de datos */


    if (errorCount === 0) {
        //window.location.href = "schedule.html";
    }
}


/**
 * Comprueba si una cadena de texto está vacía o es solo espacio en blanco
 * @param {string} str Cadena de texto a comprobar
 * @return {boolean} Devuelve "true" si está vacía o es solo espacio en blanco; "false" si es al contrario
 */
function isOnlyWhitespaceOrEmpty(str) {
    return str.trim().length === 0;
}

function Login() {
    let loginForm = document.getElementById('loginForm');

    const data = new URLSearchParams();
    for (const pair of new FormData(loginForm)) {
        data.append(pair[0], pair[1]);
    }

    let leCosa;
    fetch('http://localhost:8000/api/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            // Adjust the content type based on your data
            // Add any additional headers as needed
        },
        body: data,
    }).then(answer => {
        answerGlobal = answer.json;
        console.log(leCosa);
    }).catch(error => {
        // Handle errors during the fetch
        console.error('Fetch error:', error);
    });
}
