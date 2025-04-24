<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Level;

class LevelSeeder extends Seeder
{
    public function run()
    {
        Level::create([
            'name' => 'المستوى التمهيدي',
            'code' => 'L0',
            'description' => 'مستوى تمهيدي للمبتدئين',
        ]);

        Level::create([
            'name' => 'المستوى الأول',
            'code' => 'L1',
            'description' => 'المستوى الأساسي',
        ]);

        Level::create([
            'name' => 'المستوى الثاني',
            'code' => 'L2',
            'description' => 'المستوى المتوسط',
        ]);

        Level::create([
            'name' => 'المستوى الثالث',
            'code' => 'L3',
            'description' => 'المستوى المتقدم',
        ]);

        Level::create([
            'name' => 'المستوى الرابع',
            'code' => 'L4',
            'description' => 'المستوى التخصصي',
        ]);
    }
} 