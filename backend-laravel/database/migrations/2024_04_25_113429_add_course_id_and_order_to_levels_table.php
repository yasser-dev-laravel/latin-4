<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('levels', function (Blueprint $table) {
            $table->foreignId('course_id')->after('description')->constrained()->cascadeOnDelete();
            $table->integer('order')->after('course_id');
            $table->dropColumn('code'); // Remove the code column as it's not used
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('levels', function (Blueprint $table) {
            $table->dropForeign(['course_id']);
            $table->dropColumn(['course_id', 'order']);
            $table->string('code')->after('name'); // Add back the code column
        });
    }
}; 