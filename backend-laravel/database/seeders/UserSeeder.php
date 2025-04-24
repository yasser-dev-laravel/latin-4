<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // إنشاء مدير
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'role' => 'ADMIN',
            'phone' => '0123456789',
            'address' => 'عنوان المدير'
        ]);

        // إنشاء معلم
        User::create([
            'name' => 'Teacher',
            'email' => 'teacher@example.com',
            'password' => Hash::make('teacher123'),
            'role' => 'TEACHER',
            'phone' => '0123456788',
            'address' => 'عنوان المعلم'
        ]);

        // إنشاء طالب
        User::create([
            'name' => 'Student',
            'email' => 'student@example.com',
            'password' => Hash::make('student123'),
            'role' => 'STUDENT',
            'phone' => '0123456787',
            'address' => 'عنوان الطالب'
        ]);
    }
} 