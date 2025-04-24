<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role === 'teacher') {
            $courses = Course::where('teacher_id', $user->id)->with('lessons', 'assignments')->get();
        } else {
            $courses = Course::whereHas('students', function ($query) use ($user) {
                $query->where('student_id', $user->id);
            })->with('lessons', 'assignments')->get();
        }
        return response()->json($courses);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $course = Course::create([
            ...$validated,
            'teacher_id' => Auth::id(),
            'status' => 'active'
        ]);

        return response()->json($course, 201);
    }

    public function show(Course $course)
    {
        return response()->json($course->load('lessons', 'assignments', 'teacher'));
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
            'status' => 'sometimes|in:active,inactive,completed'
        ]);

        $course->update($validated);
        return response()->json($course);
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return response()->json(null, 204);
    }
} 