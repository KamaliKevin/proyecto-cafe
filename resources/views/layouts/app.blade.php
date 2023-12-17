<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])

    <!-- Custom CSS -->
    <link href="{{ asset('css/main.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app">
        <main class="py-4 palegrey-bg">
            @yield('content')
        </main>
    </div>

    <!-- Bootstrap JS -->
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    <!-- Especialidades -->
    <script src="{{ asset('js/specialties.js') }}"></script>
    <!-- Departamentos -->
    <script src="{{ asset('js/departments.js') }}"></script>
    <!-- Profesores -->
    <script src="{{ asset('js/teachers.js') }}"></script>
    <!-- Cursos -->
    <script src="{{ asset('js/courses.js') }}"></script>
    <!-- Módulos -->
    <script src="{{ asset('js/subjects.js') }}"></script>
    <!-- Control de horario -->
    <script src="{{ asset('js/main.js') }}"></script>
    <!-- Control de departamento -->
    <script src="{{ asset('js/departmentControl.js') }}"></script>
    <!-- Control de estudios -->
    <script src="{{ asset('js/studyControl.js') }}"></script>
</body>

</html>