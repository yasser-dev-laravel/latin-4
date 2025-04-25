<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Branch;
use App\Models\Department;
use App\Models\Room;
use App\Models\Level;
use App\Models\Course;
use App\Models\Lecture;
use App\Models\Assessment;
use App\Models\Message;
use App\Models\Cashbox;
use App\Models\Receipt;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // إنشاء الفروع
        $branches = Branch::factory(3)->create();

        // إنشاء الأقسام لكل فرع
        $departments = collect();
        $branches->each(function ($branch) use ($departments) {
            $departments->push(
                Department::factory(2)->create(['branch_id' => $branch->id])
            );
        });

        // إنشاء الغرف لكل فرع
        $rooms = collect();
        $branches->each(function ($branch) use ($rooms) {
            $rooms->push(
                Room::factory(3)->create(['branch_id' => $branch->id])
            );
        });

        // إنشاء الدورات
        $courses = Course::factory(10)->create();

        // إنشاء المستويات لكل دورة
        $courses->each(function ($course) {
            Level::factory(rand(1, 3))->create([
                'course_id' => $course->id,
                'order' => function() {
                    static $order = 1;
                    return $order++;
                }
            ]);
        });

        // إنشاء المستخدمين (معلمين وطلاب)
        $teachers = User::factory(5)->create([
            'role' => 'TEACHER',
            'password' => Hash::make('password')
        ]);

        $students = User::factory(10)->create([
            'role' => 'STUDENT',
            'password' => Hash::make('password')
        ]);

        // إنشاء المحاضرات
        $lectures = collect();
        $courses->each(function ($course) use ($teachers, $rooms, $lectures) {
            $course->levels->each(function ($level) use ($course, $teachers, $rooms, $lectures) {
                $lectures->push(
                    Lecture::factory(5)->create([
                        'course_id' => $course->id,
                        'teacher_id' => $teachers->random()->id,
                        'room_id' => $rooms->flatten()->random()->id,
                        'level_id' => $level->id
                    ])
                );
            });
        });

        // إنشاء سجلات الحضور
        $lectures->flatten()->each(function ($lecture) use ($students) {
            $students->random(rand(5, 8))->each(function ($student) use ($lecture) {
                $lecture->attendances()->create([
                    'student_id' => $student->id,
                    'is_present' => rand(0, 1)
                ]);
            });
        });

        // إنشاء التقييمات
        $assessments = collect();
        $courses->each(function ($course) use ($assessments) {
            $course->levels->each(function ($level) use ($course, $assessments) {
                $assessments->push(
                    Assessment::factory(2)->create([
                        'course_id' => $course->id,
                        'level_id' => $level->id
                    ])
                );
            });
        });

        // إنشاء الرسائل
        Message::factory(20)->create([
            'sender_id' => fn() => $teachers->random()->id,
            'receiver_id' => fn() => $students->random()->id
        ]);

        // إنشاء الصناديق
        $cashboxes = collect();
        $branches->each(function ($branch) use ($cashboxes) {
            $cashboxes->push(
                Cashbox::factory(2)->create(['branch_id' => $branch->id])
            );
        });

        // إنشاء الإيصالات
        $cashboxes->flatten()->each(function ($cashbox) use ($students, $courses) {
            Receipt::factory(5)->create([
                'student_id' => $students->random()->id,
                'course_id' => $courses->random()->id,
                'cashbox_id' => $cashbox->id
            ]);
        });

        // ربط الطلاب بالدورات
        $students->each(function ($student) use ($courses) {
            $student->courses()->attach(
                $courses->random(rand(1, 3))->pluck('id')->toArray(),
                [
                    'status' => 'active',
                    'enrolled_at' => Carbon::now()->subDays(rand(1, 30))
                ]
            );
        });
    }
}
