<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Branch;

class BranchSeeder extends Seeder
{
    public function run()
    {
        Branch::create([
            'name' => 'الفرع الرئيسي',
            'address' => 'شارع الملك فهد، الرياض',
            'phone' => '0112345678',
        ]);

        Branch::create([
            'name' => 'الفرع الغربي',
            'address' => 'شارع التحلية، جدة',
            'phone' => '0126789012',
        ]);

        Branch::create([
            'name' => 'الفرع الشرقي',
            'address' => 'شارع الظهران، الدمام',
            'phone' => '0138901234',
        ]);
    }
} 