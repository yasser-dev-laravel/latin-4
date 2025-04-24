<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $fillable = [
        'title',
        'description',
        'course_id',
        'level_id',
        'total_marks'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function results()
    {
        return $this->hasMany(AssessmentResult::class);
    }
}
