<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\Level;

class CourseSeeder extends Seeder
{
    public function run()
    {
        $course1 = Course::create([
            'name' => 'النحو الأساسي',
            'description' => 'دورة في أساسيات النحو العربي',
            'price' => 500.00,
            'duration' => 30, // 30 يوم
        ]);

        $course2 = Course::create([
            'name' => 'الصرف للمبتدئين',
            'description' => 'دورة في أساسيات الصرف العربي',
            'price' => 450.00,
            'duration' => 25,
        ]);

        $course3 = Course::create([
            'name' => 'البلاغة العربية',
            'description' => 'دورة في علوم البلاغة العربية',
            'price' => 600.00,
            'duration' => 45,
        ]);

        // ربط الدورات بالمستويات
        $levels = Level::all();
        
        $course1->levels()->attach([
            $levels[0]->id, // المستوى التمهيدي
            $levels[1]->id, // المستوى الأول
        ]);

        $course2->levels()->attach([
            $levels[1]->id, // المستوى الأول
            $levels[2]->id, // المستوى الثاني
        ]);

        $course3->levels()->attach([
            $levels[2]->id, // المستوى الثاني
            $levels[3]->id, // المستوى الثالث
            $levels[4]->id, // المستوى الرابع
        ]);
    }
} 