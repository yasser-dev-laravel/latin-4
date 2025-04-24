<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\AssignmentController;

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

// Public routes
Route::post('/users/login', [LoginController::class, 'login']);
Route::post('/users/register', [RegisterController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'current']);
    Route::post('/users/logout', [LogoutController::class, 'logout']);

    // Courses
    Route::apiResource('courses', CourseController::class);
    
    // Lessons
    Route::apiResource('courses.lessons', LessonController::class);
    
    // Assignments
    Route::apiResource('courses.assignments', AssignmentController::class);
}); 