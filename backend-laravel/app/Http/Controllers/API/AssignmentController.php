<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function index(Course $course)
    {
        return response()->json($course->assignments()->with('submissions')->get());
    }

    public function store(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'points' => 'required|integer|min:1',
        ]);

        $assignment = $course->assignments()->create([
            ...$validated,
            'status' => 'active'
        ]);

        return response()->json($assignment, 201);
    }

    public function show(Course $course, Assignment $assignment)
    {
        return response()->json($assignment->load('submissions'));
    }

    public function update(Request $request, Course $course, Assignment $assignment)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'due_date' => 'sometimes|date',
            'points' => 'sometimes|integer|min:1',
            'status' => 'sometimes|in:active,inactive,completed'
        ]);

        $assignment->update($validated);
        return response()->json($assignment);
    }

    public function destroy(Course $course, Assignment $assignment)
    {
        $assignment->delete();
        return response()->json(null, 204);
    }
} 