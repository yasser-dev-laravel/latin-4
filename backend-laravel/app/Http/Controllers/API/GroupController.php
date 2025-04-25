<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GroupController extends Controller
{
    public function __construct()
    {
        // إزالة authorizeResource
    }

    public function index(Request $request)
    {
        if (!Gate::allows('viewAny-group')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $query = Group::with(['course', 'instructor', 'room', 'students']);
        
        // تصفية حسب الحالة
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // تصفية حسب المدرب
        if ($request->has('instructor_id')) {
            $query->where('instructor_id', $request->instructor_id);
        }
        
        // تصفية حسب الدورة
        if ($request->has('course_id')) {
            $query->where('course_id', $request->course_id);
        }

        $groups = $query->get();
        return response()->json($groups);
    }

    public function store(Request $request)
    {
        if (!Gate::allows('create-group')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:groups',
            'course_id' => 'required|exists:courses,id',
            'level' => 'required|string|max:50',
            'instructor_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'start_date' => 'required|date|after_or_equal:today',
            'days' => 'required|array',
            'days.*' => 'required|string|in:sunday,monday,tuesday,wednesday,thursday,friday,saturday',
            'start_time' => 'required|date_format:H:i',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:active,waiting,postponed,cancelled,finished',
            'students' => 'array',
            'students.*' => 'exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $group = Group::create($request->all());

            if ($request->has('students')) {
                $group->students()->sync($request->students);
                $group->update(['students' => count($request->students)]);
            }

            return response()->json([
                'message' => 'Group created successfully',
                'data' => $group->load(['course', 'instructor', 'room', 'students'])
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create group',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Group $group)
    {
        if (!Gate::allows('view-group', $group)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        try {
            return response()->json([
                'data' => $group->load(['course', 'instructor', 'room', 'students'])
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Group not found'
            ], 404);
        }
    }

    public function update(Request $request, Group $group)
    {
        if (!Gate::allows('update-group', $group)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'code' => 'string|max:50|unique:groups,code,' . $group->id,
            'course_id' => 'exists:courses,id',
            'level' => 'string|max:50',
            'instructor_id' => 'exists:users,id',
            'room_id' => 'exists:rooms,id',
            'start_date' => 'date|after_or_equal:today',
            'days' => 'array',
            'days.*' => 'string|in:sunday,monday,tuesday,wednesday,thursday,friday,saturday',
            'start_time' => 'date_format:H:i',
            'end_date' => 'date|after:start_date',
            'status' => 'in:active,waiting,postponed,cancelled,finished',
            'students' => 'array',
            'students.*' => 'exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $group->update($request->all());

            if ($request->has('students')) {
                $group->students()->sync($request->students);
                $group->update(['students' => count($request->students)]);
            }

            return response()->json([
                'message' => 'Group updated successfully',
                'data' => $group->load(['course', 'instructor', 'room', 'students'])
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update group',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Group $group)
    {
        if (!Gate::allows('delete-group', $group)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        try {
            $group->delete();
            return response()->json([
                'message' => 'Group deleted successfully'
            ], 204);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete group',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function addStudent(Request $request, Group $group)
    {
        if (!Gate::allows('update-group', $group)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'student_id' => 'required|exists:users,id',
            'status' => 'required|in:active,waiting,postponed,cancelled,finished'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $group->students()->attach($request->student_id, [
                'status' => $request->status
            ]);
            
            $group->increment('students');
            
            return response()->json([
                'message' => 'Student added successfully',
                'data' => $group->load('students')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to add student',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 