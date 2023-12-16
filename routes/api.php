<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ModuloController;
use App\Http\Controllers\Auth\LoginRegisterController;
use App\Http\Controllers\Api\V1\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('modulos', ModuloController::class);
});


// Public routes of authtication
Route::controller(LoginRegisterController::class)->group(function() {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

// Public routes of product
Route::controller(ModuloController::class)->group(function() {
    Route::get('/modulos', 'index');
    Route::get('/modulos/{id}', 'show');
    Route::get('/modulos/profesor/{id}', 'indexTeacher');
    Route::get('/modulos/profesorm/{id}', 'indexTeacherMissing');
});

Route::apiResource('users', UserController::class);

// Protected routes of product and logout
Route::middleware('auth:sanctum')->group( function () {
    Route::post('/logout', [LoginRegisterController::class, 'logout']);

    Route::controller(ModuloController::class)->group(function() {
        Route::post('/modulos', 'store');
        Route::post('/modulos/{id}', 'update');
        Route::delete('/modulos/{id}', 'destroy');
    });
});