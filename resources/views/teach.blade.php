<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Bootstrap CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
        <!-- CSS personalizado -->
        <link href="css/main.css" rel="stylesheet">

        <title>Formulario para Profesores - CIFP Majada Marcial</title>
    </head>

    <body class="palegrey-bg">
        <div class="d-flex justify-content-center align-content-center">

            <!-- Formulario -->
            <form class="form-width bg-white my-5 border border-dark border-1 rounded-3" id="mainForm" name="mainForm">
                <!-- Título del formulario -->
                <div class="py-3 px-5 semiblack-bg text-white border border-dark border-3 rounded-top-3">
                    <h4>Modificación de horario</h4>
                </div>

                <!-- Logo -->
                <div class="d-flex justify-content-center align-content-center pt-3">
                    <div class="m-logo-width">
                        <img src="images/logo.png" class="img-fluid" alt="Logo">
                    </div>
                </div>

                <!-- Contenido del formulario -->
                <div class="py-3 px-5" id="formContent">
                    <!-- Datos del profesor -->
                    <div class="mb-3">
                        <label for="firstName" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="firstName" name="firstName" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Apellidos</label>
                        <input type="text" class="form-control" id="lastName" name="lastName" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="department" class="form-label">Departamento</label>
                        <input type="text" class="form-control" id="department" name="department" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="specialty" class="form-label">Especialidad</label>
                        <input type="text" class="form-control" id="specialty" name="specialty" disabled>
                    </div>
                    <div class="mb-4">
                        <label for="schoolYear" class="form-label">Año escolar</label>
                        <input type="text" class="form-control" id="schoolYear" name="schoolYear" disabled>
                    </div>

                    <!-- Datos de los módulos -->
                    <div class="accordion mb-4" id="subjectContainer">
                        <!-- Aquí habrían varios desplegables de acordeón, cada uno siendo un módulo de un profesor -->
                    </div>

                    <!-- Opciones del formulario -->
                    <div class="mb-3" id="optionContainer">
                        <!-- Aquí irían todas las opciones iniciales del formulario -->
                    </div>

                    <!-- Total de horas -->
                    <p class="mb-3">Total del horas: <span id="totalHours"></span></p>
                    <p class="mb-5" id="hoursWarning"></p>

                    <!-- Módulos nuevos -->
                    <div class="mb-3" id="addSubjectContainer">
                        <!-- Aquí se pondría un formulario dinámico cuando se añade un módulo nuevo -->
                    </div>
                </div>
            </form>
        </div>

        <!-- Bootstrap JS -->
        <script src="js/bootstrap.min.js"></script>
        <!-- Especialidades -->
        <script src="js/specialties.js"></script>
        <!-- Departamentos -->
        <script src="js/departments.js"></script>
        <!-- Profesores -->
        <script src="js/teachers.js"></script>
        <!-- Cursos -->
        <script src="js/courses.js"></script>
        <!-- Módulos -->
        <script src="js/subjects.js"></script>
        <!-- Control de horario -->
        <script src="js/main.js"></script>
        <!-- <script src="{{ asset('js/main.js')}}"></script> -->
    </body>
</html>

