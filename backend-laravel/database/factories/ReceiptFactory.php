<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Receipt;
use App\Models\User;
use App\Models\Course;
use App\Models\Cashbox;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Receipt>
 */
class ReceiptFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Receipt::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => User::factory(),
            'course_id' => Course::factory(),
            'amount' => fake()->numberBetween(1000, 5000),
            'payment_method' => fake()->randomElement(['cash', 'credit_card', 'bank_transfer']),
            'cashbox_id' => Cashbox::factory(),
        ];
    }
} 