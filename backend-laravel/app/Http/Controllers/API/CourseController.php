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
            // إرجاع جميع الدورات مع العلاقات الضرورية فقط للواجهة
            $courses = Course::with('levels')->get();
            return response()->json($courses);

            /* الكود الأصلي - معلق مؤقتاً للتشخيص
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
            */
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في جلب الدورات', 'details' => $e->getMessage()], 500);
        }
    }

    // جلب دورة محددة
    public function show($id)
    {
        try {
            // تبسيط استدعاء العلاقات للتوافق مع واجهة المستخدم
            $course = Course::with('levels')->find($id);
            
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
                'description' => 'nullable|string',
                'category_id' => 'nullable|integer',
                'active' => 'boolean',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => 'بيانات غير صالحة', 'details' => $validator->errors()], 422);
            }

            $course = Course::create([
                'name' => $request->name,
                'description' => $request->description,
                'category_id' => $request->category_id,
                'active' => $request->active ?? true,
            ]);

            return response()->json($course, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في إنشاء الدورة', 'details' => $e->getMessage()], 500);
        }
    }

    // تحديث دورة موجودة
    public function update(Request $request, $id)
    {
        try {
            $course = Course::findOrFail($id);
            
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'category_id' => 'nullable|integer',
                'active' => 'boolean',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => 'بيانات غير صالحة', 'details' => $validator->errors()], 422);
            }

            $course->update($request->all());
            
            // أعد تحميل الكورس مع علاقة المستويات بعد التحديث
            $course = Course::with('levels')->find($id);
            
            return response()->json($course);
        } catch (\ModelNotFoundException $e) {
            return response()->json(['error' => 'الدورة غير موجودة'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في تحديث الدورة', 'details' => $e->getMessage()], 500);
        }
    }

    // حذف دورة
    public function destroy($id)
    {
        try {
            $course = Course::findOrFail($id);
            $course->delete();
            
            return response()->json(['message' => 'تم حذف الدورة بنجاح']);
        } catch (\ModelNotFoundException $e) {
            return response()->json(['error' => 'الدورة غير موجودة'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في حذف الدورة', 'details' => $e->getMessage()], 500);
        }
    }

    // إضافة مستوى جديد للدورة
    public function addLevel(Request $request, $courseId)
    {
        try {
            $course = Course::findOrFail($courseId);
            
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'code' => 'required|string|max:50',
                'level' => 'required|integer|min:1',
                'lectures_count' => 'required|integer|min:1',
                'lecture_duration' => 'required|integer|min:15',
                'price' => 'required|numeric|min:0',
                'is_active' => 'boolean',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => 'بيانات غير صالحة', 'details' => $validator->errors()], 422);
            }

            $level = new CourseLevel([
                'name' => $request->name,
                'code' => $request->code,
                'level' => $request->level,
                'lectures_count' => $request->lectures_count,
                'lecture_duration' => $request->lecture_duration,
                'price' => $request->price,
                'is_active' => $request->is_active ?? true,
                'course_id' => $courseId,
            ]);

            $level->save();
            
            return response()->json($level, 201);
        } catch (\ModelNotFoundException $e) {
            return response()->json(['error' => 'الدورة غير موجودة'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في إضافة المستوى', 'details' => $e->getMessage()], 500);
        }
    }

    // جلب مستويات الدورة
    public function getLevels($courseId)
    {
        try {
            $course = Course::findOrFail($courseId);
            $levels = $course->levels;
            
            return response()->json($levels);
        } catch (\ModelNotFoundException $e) {
            return response()->json(['error' => 'الدورة غير موجودة'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في جلب مستويات الدورة', 'details' => $e->getMessage()], 500);
        }
    }

    // تحديث مستوى
    public function updateLevel(Request $request, $levelId)
    {
        try {
            $level = CourseLevel::findOrFail($levelId);
            
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'code' => 'sometimes|required|string|max:50',
                'level' => 'sometimes|required|integer|min:1',
                'lectures_count' => 'sometimes|required|integer|min:1',
                'lecture_duration' => 'sometimes|required|integer|min:15',
                'price' => 'sometimes|required|numeric|min:0',
                'is_active' => 'boolean',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => 'بيانات غير صالحة', 'details' => $validator->errors()], 422);
            }

            $level->update($request->all());
            
            return response()->json($level);
        } catch (\ModelNotFoundException $e) {
            return response()->json(['error' => 'المستوى غير موجود'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في تحديث المستوى', 'details' => $e->getMessage()], 500);
        }
    }

    // حذف مستوى
    public function deleteLevel($levelId)
    {
        try {
            $level = CourseLevel::findOrFail($levelId);
            $level->delete();
            
            return response()->json(['message' => 'تم حذف المستوى بنجاح']);
        } catch (\ModelNotFoundException $e) {
            return response()->json(['error' => 'المستوى غير موجود'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل في حذف المستوى', 'details' => $e->getMessage()], 500);
        }
    }
}
