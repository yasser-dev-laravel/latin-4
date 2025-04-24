<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Branch;

class DepartmentSeeder extends Seeder
{
    public function run()
    {
        $mainBranch = Branch::where('name', 'الفرع الرئيسي')->first();
        
        Department::create([
            'name' => 'قسم اللغة العربية',
            'branch_id' => $mainBranch->id,
        ]);

        Department::create([
            'name' => 'قسم القرآن الكريم',
            'branch_id' => $mainBranch->id,
        ]);

        Department::create([
            'name' => 'قسم العلوم الشرعية',
            'branch_id' => $mainBranch->id,
        ]);
    }
} 