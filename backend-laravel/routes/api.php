<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\GroupController;

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
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/refresh', [AuthController::class, 'refreshToken']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'current']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // Courses
    Route::get('/courses', [CourseController::class, 'index']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::put('/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);
    
    // Course Levels
    Route::get('/courses/{courseId}/levels', [CourseController::class, 'getLevels']);
    Route::post('/courses/{courseId}/levels', [CourseController::class, 'addLevel']);
    
    // Lessons
    Route::apiResource('courses.lessons', LessonController::class);
    
    // Assignments
    Route::apiResource('courses.assignments', AssignmentController::class);

    // Groups
    Route::apiResource('groups', GroupController::class);
    
    // مسارات إدارة الطلاب في المجموعات
    Route::post('groups/{group}/students', [GroupController::class, 'addStudent']);
    Route::delete('groups/{group}/students', [GroupController::class, 'removeStudent']);
}); 