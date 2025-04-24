<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Room;
use App\Models\Branch;

class RoomSeeder extends Seeder
{
    public function run()
    {
        $mainBranch = Branch::where('name', 'الفرع الرئيسي')->first();
        
        Room::create([
            'name' => 'قاعة 1',
            'capacity' => 20,
            'branch_id' => $mainBranch->id,
        ]);

        Room::create([
            'name' => 'قاعة 2',
            'capacity' => 15,
            'branch_id' => $mainBranch->id,
        ]);

        Room::create([
            'name' => 'قاعة 3',
            'capacity' => 25,
            'branch_id' => $mainBranch->id,
        ]);

        Room::create([
            'name' => 'معمل الحاسب',
            'capacity' => 30,
            'branch_id' => $mainBranch->id,
        ]);
    }
} 