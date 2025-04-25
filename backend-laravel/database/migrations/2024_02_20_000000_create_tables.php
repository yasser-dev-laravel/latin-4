<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // جدول المستخدمين
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['ADMIN', 'TEACHER', 'STUDENT'])->default('STUDENT');
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        // جدول الفروع
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('phone');
            $table->timestamps();
        });

        // جدول الأقسام
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('branch_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // جدول الغرف
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('capacity');
            $table->foreignId('branch_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // جدول المستويات
        Schema::create('levels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->integer('order');
            $table->timestamps();
        });

        // جدول الدورات
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('duration'); // المدة بالأيام
            $table->timestamps();
        });

        // جدول ربط الدورات بالمستويات
        Schema::create('course_level', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->foreignId('level_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // جدول المحاضرات
        Schema::create('lectures', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->integer('duration'); // المدة بالدقائق
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->foreignId('level_id')->constrained()->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('room_id')->constrained()->onDelete('cascade');
            $table->dateTime('start_time');
            $table->timestamps();
        });

        // جدول الحضور
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecture_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->boolean('is_present')->default(false);
            $table->timestamps();
        });

        // جدول التقييمات
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->foreignId('level_id')->constrained()->onDelete('cascade');
            $table->integer('total_marks');
            $table->timestamps();
        });

        // جدول نتائج التقييمات
        Schema::create('assessment_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->integer('marks_obtained');
            $table->timestamps();
        });

        // جدول الرسائل
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
            $table->text('content');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });

        // جدول الصندوق
        Schema::create('cashboxes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('balance', 10, 2)->default(0);
            $table->foreignId('branch_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // جدول الإيصالات
        Schema::create('receipts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->string('payment_method');
            $table->foreignId('cashbox_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // جدول ربط الطلاب بالدورات
        Schema::create('course_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->string('status')->default('active');
            $table->timestamp('enrolled_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('course_students');
        Schema::dropIfExists('receipts');
        Schema::dropIfExists('cashboxes');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('assessment_results');
        Schema::dropIfExists('assessments');
        Schema::dropIfExists('attendances');
        Schema::dropIfExists('lectures');
        Schema::dropIfExists('course_level');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('levels');
        Schema::dropIfExists('rooms');
        Schema::dropIfExists('departments');
        Schema::dropIfExists('branches');
        Schema::dropIfExists('users');
    }
}; 