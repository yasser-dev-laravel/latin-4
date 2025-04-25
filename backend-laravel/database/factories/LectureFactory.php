<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Lecture;
use App\Models\Course;
use App\Models\Level;
use App\Models\User;
use App\Models\Room;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lecture>
 */
class LectureFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Lecture::class;

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
            'duration' => fake()->numberBetween(60, 180),
            'course_id' => Course::factory(),
            'level_id' => Level::factory(),
            'teacher_id' => User::factory(),
            'room_id' => Room::factory(),
            'start_time' => fake()->dateTimeBetween('now', '+1 month'),
        ];
    }
} 