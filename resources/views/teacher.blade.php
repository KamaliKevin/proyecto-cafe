@extends('layouts.app')

@section('content')
    <div class="d-flex justify-content-center align-content-center">

        <!-- Información -->
        <div class="form-width bg-white my-5 border border-dark border-1 rounded-3" id="mainInfo">
            @csrf

            @include('partials.content-title', ['contentTitle' => 'Modificación de horario'])

            @include('partials.logo', ['logoClass' => 'm-logo-width'])

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

                <!-- Texto de ayuda -->
                <div class="alert alert-warning mb-5">
                    <h5><i class="fa-solid fa-circle-info"></i> Información de ayuda:</h5>
                    <ul>
                        <li>El profesorado tutor tiene que impartir al menos un módulo del curso que tutoriza.</li>
                        <li>En ningún caso se debe superar las 24 horas semanales de permanencia en el centro.</li>
                        <li>El aula o taller será fijado por el departamento y no podrá modificarse posteriormente.</li>
                        <li>No se debe concentrar el horario en una modalidad o grupo.</li>
                    </ul>
                </div>

                <!-- Módulos nuevos -->
                <div class="mb-3" id="addSubjectContainer">
                    <!-- Aquí se pondría un formulario dinámico cuando se añade un módulo nuevo -->
                </div>
            </div>
        </div>
    </div>
@endsection