<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Assessment;
use App\Models\Course;
use App\Models\Level;

class AssessmentSeeder extends Seeder
{
    public function run()
    {
        $course = Course::where('name', 'النحو الأساسي')->first();
        $level = Level::where('code', 'L1')->first();

        Assessment::create([
            'title' => 'اختبار منتصف الفصل',
            'description' => 'اختبار في المرفوعات والمنصوبات',
            'course_id' => $course->id,
            'level_id' => $level->id,
            'total_marks' => 100,
        ]);

        Assessment::create([
            'title' => 'اختبار نهائي',
            'description' => 'اختبار شامل في جميع مواضيع المقرر',
            'course_id' => $course->id,
            'level_id' => $level->id,
            'total_marks' => 200,
        ]);
    }
} 