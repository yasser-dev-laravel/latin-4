<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Course;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index(Course $course)
    {
        return response()->json($course->lessons()->orderBy('order')->get());
    }

    public function store(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'order' => 'required|integer|min:1',
        ]);

        $lesson = $course->lessons()->create([
            ...$validated,
            'status' => 'active'
        ]);

        return response()->json($lesson, 201);
    }

    public function show(Course $course, Lesson $lesson)
    {
        return response()->json($lesson);
    }

    public function update(Request $request, Course $course, Lesson $lesson)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'order' => 'sometimes|integer|min:1',
            'status' => 'sometimes|in:active,inactive'
        ]);

        $lesson->update($validated);
        return response()->json($lesson);
    }

    public function destroy(Course $course, Lesson $lesson)
    {
        $lesson->delete();
        return response()->json(null, 204);
    }
} 