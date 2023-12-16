@extends('layouts.app')

@section('content')
    <div class="d-flex justify-content-center align-content-center">

        <!-- Información -->
        <div class="info-width bg-white my-5 border border-dark border-1 rounded-3" id="departmentInfo">

            @include('partials.content-title', ['contentTitle' => 'Información del departamento'])

            @include('partials.logo', ['logoClass' => 's-logo-width'])

            <!-- Contenido -->
            <div class="py-3 px-5" id="departmentContent">
                <!-- Título del departamento -->
                <h4 class="mb-5" id="departmentTitle">{{ $departmentTitle }}</h4>
                <!-- NOTA A BORRAR: La variable '$departmentTitle' viene obviamente de los datos del departamento
                al que pertenezca el jefe de departamento -->

                <!-- Opciones del / de la jefe del departamento -->
                <div class="d-flex justify-content-start align-content-center mb-5" id="departmentOptions">
                    <button type="button" class="btn btn-primary me-3" id="departmentSchedulesBtn">
                        Ver horarios de profesores
                    </button>
                    <button type="button" class="btn btn-primary me-3" id="departmentWarnedTeachersBtn">
                        Ver profesores que no llegan o sobrepasan las 18 horas semanales
                    </button>
                </div>
                <div class="mb-5">
                    <a href="{{ route('teacher') }}">
                        Registrar / Comprobar mi propio horario >>
                    </a>
                    <!-- NOTA A BORRAR: La ruta 'teacher' viene obviamente de la presunta ruta definida
                    y que corresponde con la vista para 'teacher.blade.php'.

                    Es razonable pensar que habría que pasar el ID y alguna variable (booleana) con el método 'index'
                    del controlador de 'teacher.blade.php' para que se sepa que el docente es un jefe de departamento
                    (método "with()". Ejemplo: return view('teacher')->with('isADepartmentManager', $isADepartmentManager)) -->
                </div>

                <!-- Datos del departamento -->
                <div class="mb-5" id="departmentData">
                    <!-- Aquí van los datos de los docentes -->
                </div>
            </div>
        </div>
    </div>
@endsection