<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseStudent extends Model
{
    use HasFactory;

    protected $table = 'course_students';

    protected $fillable = [
        'course_id',
        'student_id',
        'enrollment_date',
        'status',
        'grade',
        'notes'
    ];

    protected $casts = [
        'enrollment_date' => 'datetime',
        'grade' => 'float'
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
} 