@extends('layouts.app')

@section('content')
    <div class="d-flex justify-content-center align-content-center">

        <!-- Formulario -->
        <form method="POST" action="{{ route('login') }}" class="form-width bg-white my-5 border border-dark border-1 rounded-3" id="loginForm" name="loginForm">
            @csrf
            <!-- Título del formulario -->
            <div class="py-3 px-5 semiblack-bg text-white border border-dark border-3 rounded-top-3">
                <h4>Iniciar sesión</h4>
            </div>

            <!-- Logo -->
            <div class="d-flex justify-content-center align-content-center pt-3">
                <div class="m-logo-width">
                    <img src="{{ asset('images/logo.png') }}" class="img-fluid" alt="Logo">
                </div>
            </div>

            <!-- Contenido del formulario -->
            <div class="py-3 px-5" id="loginFormContent">
                <!-- Datos del profesor -->
                <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" autocomplete="email" autofocus>
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <div class="mb-5">
                    <label for="password" class="form-label">Contraseña</label>
                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password">
                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <button type="submit" class="btn btn-primary">
                    {{ __('Login') }}
                </button>
            </div>
        </form>
    </div>
@endsection
