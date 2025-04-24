<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lecture;
use App\Models\Course;
use App\Models\Level;
use App\Models\User;
use App\Models\Room;
use Carbon\Carbon;

class LectureSeeder extends Seeder
{
    public function run()
    {
        $teacher = User::where('role', 'TEACHER')->first();
        $room = Room::first();
        $course = Course::where('name', 'النحو الأساسي')->first();
        $level = Level::where('code', 'L1')->first();

        // محاضرات النحو الأساسي
        Lecture::create([
            'title' => 'مقدمة في علم النحو',
            'description' => 'تعريف علم النحو وأهميته',
            'duration' => 90, // 90 دقيقة
            'course_id' => $course->id,
            'level_id' => $level->id,
            'teacher_id' => $teacher->id,
            'room_id' => $room->id,
            'start_time' => Carbon::now()->addDays(1)->setHour(10),
        ]);

        Lecture::create([
            'title' => 'المرفوعات',
            'description' => 'دراسة المرفوعات في اللغة العربية',
            'duration' => 120,
            'course_id' => $course->id,
            'level_id' => $level->id,
            'teacher_id' => $teacher->id,
            'room_id' => $room->id,
            'start_time' => Carbon::now()->addDays(2)->setHour(10),
        ]);

        Lecture::create([
            'title' => 'المنصوبات',
            'description' => 'دراسة المنصوبات في اللغة العربية',
            'duration' => 120,
            'course_id' => $course->id,
            'level_id' => $level->id,
            'teacher_id' => $teacher->id,
            'room_id' => $room->id,
            'start_time' => Carbon::now()->addDays(3)->setHour(10),
        ]);
    }
} 