<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            BranchSeeder::class,
            DepartmentSeeder::class,
            RoomSeeder::class,
            LevelSeeder::class,
            CourseSeeder::class,
            LectureSeeder::class,
            AssessmentSeeder::class,
        ]);
    }
}
