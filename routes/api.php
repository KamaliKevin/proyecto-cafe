<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\SubjectController;
use App\Http\Controllers\Auth\LoginRegisterController;
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
    Route::resource('subjects', SubjectController::class);
});


// Public routes for authentication:
Route::controller(LoginRegisterController::class)->group(function() {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});


// Public routes for subjects:
Route::controller(SubjectController::class)->group(function() {
    Route::get('/subjects', 'index');
    Route::get('/subjects/{id}', 'show');
    Route::get('/subjects/user/{id}', 'indexUser');
});


// Protected routes of subjects and logout:
Route::middleware('auth:sanctum')->group( function () {
    Route::post('/logout', [LoginRegisterController::class, 'logout']);

    Route::controller(SubjectController::class)->group(function() {
        Route::post('/subjects', 'store');
        Route::post('/subjects/{id}', 'update');
        Route::delete('/subjects/{id}', 'destroy');
    });
});
