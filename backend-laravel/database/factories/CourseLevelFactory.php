<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\CourseLevel;
use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseLevel>
 */
class CourseLevelFactory extends Factory
{
    protected $model = CourseLevel::class;

    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'level_id' => Level::factory(),
        ];
    }
} 