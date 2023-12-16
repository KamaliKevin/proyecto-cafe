@extends('layouts.app')

@section('content')
    <div class="d-flex justify-content-center align-content-center">

        <!-- Información -->
        <div class="info-width bg-white my-5 border border-dark border-1 rounded-3" id="studyInfo">

            @include('partials.content-title', ['contentTitle' => 'Información de estudios'])

            @include('partials.logo', ['logoClass' => 's-logo-width'])

            <!-- Contenido -->
            <div class="py-3 px-5" id="studyContent">
                <!-- Opciones del / de la jefe de estudios -->
                <div class="d-flex justify-content-start align-content-center mb-5" id="studiesOptions">
                    <div class="mb-3">
                        <label for="departments" class="form-label">Elija el departamento que quiere visualizar:</label>
                        <select id="departments" name="departments" class="form-select">
                            <!-- Aquí irían todos los datos de todos los departamentos -->
                            <option value="-- Elija un departamento --">-- Elija un departamento --</option>
                        </select>
                    </div>
                </div>
                <div class="mb-5">
                    <button class="btn btn-primary" id="hoursPerShiftTimeBtn">
                        Ver horas asignadas por aula (mañana y tarde)
                    </button>
                </div>
                <div class="mb-5">
                    <a href="{{ route('teacher') }}">
                        Registrar / Comprobar mi propio horario >>
                    </a>
                    <!-- NOTA A BORRAR: La ruta 'teacher' viene obviamente de la presunta ruta definida
                    y que corresponde con la vista para 'teacher.blade.php'.

                    Es razonable pensar que habría que pasar el ID y alguna variable (booleana) con el método 'index'
                    del controlador de 'teacher.blade.php' para que se sepa que el docente es un jefe de estudios
                    (método "with()". Ejemplo: return view('teacher')->with('isAStudyManager', $isAStudyManager)) -->
                </div>

                <!-- Datos del departamento -->
                <div class="mb-5" id="studyData">
                    <!-- Aquí van los datos de los docentes o las aulas -->
                </div>
            </div>
        </div>
    </div>
@endsection