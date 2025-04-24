<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->string('level');
            $table->foreignId('instructor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('room_id')->constrained()->onDelete('cascade');
            $table->date('start_date');
            $table->json('days');
            $table->time('start_time');
            $table->date('end_date');
            $table->enum('status', ['active', 'waiting', 'postponed', 'cancelled', 'finished'])->default('waiting');
            $table->integer('students')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('groups');
    }
}; 