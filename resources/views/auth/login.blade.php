@extends('layouts.app')

@section('content')
    <div class="d-flex justify-content-center align-content-center">
        <!-- Formulario -->
        <form method="POST" action="{{ route('login') }}" class="form-width bg-white my-5 border border-dark border-1 rounded-3" id="loginForm" name="loginForm">
            @csrf

            @include('partials.content-title', ['contentTitle' => 'Iniciar sesión'])

            @include('partials.logo', ['logoClass' => 'm-logo-width'])

            <!-- Contenido del formulario -->
            <div class="py-3 px-5" id="loginFormContent">
                <!-- Datos del profesor -->
                <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <div class="mb-5">
                    <label for="password" class="form-label">Contraseña</label>
                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <button type="submit" class="btn btn-primary">
                    {{ __('Login') }}
                </button>
                <div class="mb-5" id="loginFormErrors">
                    <!-- Aquí van los errores a la hora de iniciar sesión -->
                </div>
            </div>
        </form>
    </div>

    @auth
        <script>
            // Custom JavaScript code to execute after successful login
            document.addEventListener('DOMContentLoaded', function () {
                document.getElementById('loginForm').addEventListener('submit', function (event) {
                    // Prevent the default form submission
                    event.preventDefault();

                    // Your custom code here, for example, storing user ID in localStorage
                    var userId = {{ auth()->id() }};
                    localStorage.setItem('userID', userId);

                    // Submit the form programmatically if needed
                    this.submit();
                });
            });
        </script>
    @endauth
@endsection