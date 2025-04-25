<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Assessment;
use App\Models\Course;
use App\Models\Level;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Assessment>
 */
class AssessmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Assessment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'course_id' => Course::factory(),
            'level_id' => Level::factory(),
            'course_id' => \App\Models\Course::factory(),
            'level_id' => \App\Models\Level::factory(),
            'total_marks' => fake()->numberBetween(50, 100),
        ];
    }
} 