<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Room::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['قاعة عامة', 'معمل لغات', 'معمل كمبيوتر'];
        $type = $this->faker->randomElement($types);
        $prefix = match($type) {
            'قاعة عامة' => 'H',
            'معمل لغات' => 'L',
            'معمل كمبيوتر' => 'C',
            default => 'R'
        };
        
        return [
            'name' => $this->faker->word() . ' ' . $type,
            'number' => $prefix . Str::padLeft($this->faker->unique()->numberBetween(1, 999), 3, '0'),
            'capacity' => $this->faker->numberBetween(15, 40),
            'type' => $type,
            'branch_id' => Branch::factory(),
        ];
    }
} 