<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseLevel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    // جلب جميع الدورات
    public function index()
    {
        try {
            $user = Auth::user();
            
            if ($user->role === 'teacher') {
                $courses = Course::where('teacher_id', $user->id)
                    ->with(['levels', 'lessons', 'assignments'])
                    ->get();
            } elseif ($user->role === 'student') {
                $courses = Course::whereHas('students', function ($query) use ($user) {
                    $query->where('student_id', $user->id);
                })->with(['levels', 'lessons', 'assignments'])->get();
            } else {
                // المدير يرى كل الكورسات
                $courses = Course::with(['levels', 'lessons', 'assignments'])->get();
            }
            
            return response()->json($courses);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في جلب الدورات', 'details' => $e->getMessage()], 500);
        }
    }

    // جلب دورة محددة
    public function show($id)
    {
        try {
            $course = Course::with(['levels', 'lessons', 'assignments', 'teacher'])->find($id);
            
            if (!$course) {
                return response()->json(['error' => 'الدورة غير موجودة'], 404);
            }
            
            return response()->json($course);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في جلب الدورة', 'details' => $e->getMessage()], 500);
        }
    }

    // إنشاء دورة جديدة
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric|min:0',
                'duration' => 'required|integer|min:1',
                'category_id' => 'required|exists:categories,id',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after:start_date',
                'active' => 'boolean'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $courseData = $request->all();
            $courseData['teacher_id'] = Auth::id();
            $courseData['status'] = 'active';

            $course = Course::create($courseData);
            return response()->json($course, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في إنشاء الدورة', 'details' => $e->getMessage()], 500);
        }
    }

    // تحديث دورة موجودة
    public function update(Request $request, $id)
    {
        try {
            $course = Course::find($id);
            
            if (!$course) {
                return response()->json(['error' => 'الدورة غير موجودة'], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'description' => 'sometimes|string',
                'price' => 'sometimes|numeric|min:0',
                'duration' => 'sometimes|integer|min:1',
                'category_id' => 'sometimes|exists:categories,id',
                'start_date' => 'sometimes|date',
                'end_date' => 'sometimes|date|after:start_date',
                'status' => 'sometimes|in:active,inactive,completed',
                'active' => 'boolean'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $course->update($request->all());
            return response()->json($course);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في تحديث الدورة', 'details' => $e->getMessage()], 500);
        }
    }

    // حذف دورة
    public function destroy($id)
    {
        try {
            $course = Course::find($id);
            
            if (!$course) {
                return response()->json(['error' => 'الدورة غير موجودة'], 404);
            }

            $course->delete();
            return response()->json(['message' => 'تم حذف الدورة بنجاح']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في حذف الدورة', 'details' => $e->getMessage()], 500);
        }
    }

    // إضافة مستوى جديد للدورة
    public function addLevel(Request $request, $courseId)
    {
        try {
            $course = Course::find($courseId);
            
            if (!$course) {
                return response()->json(['error' => 'الدورة غير موجودة'], 404);
            }

            $validator = Validator::make($request->all(), [
                'level' => 'required|integer|min:1',
                'name' => 'required|string|max:255',
                'code' => 'required|string|max:50',
                'lectures_count' => 'required|integer|min:1',
                'lecture_duration' => 'required|numeric|min:0',
                'price' => 'required|numeric|min:0',
                'is_active' => 'boolean'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $level = $course->levels()->create($request->all());
            return response()->json($level, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في إضافة المستوى', 'details' => $e->getMessage()], 500);
        }
    }

    // جلب مستويات الدورة
    public function getLevels($courseId)
    {
        try {
            $course = Course::with('levels')->find($courseId);
            
            if (!$course) {
                return response()->json(['error' => 'الدورة غير موجودة'], 404);
            }
            
            return response()->json($course->levels);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في جلب مستويات الدورة', 'details' => $e->getMessage()], 500);
        }
    }
}
