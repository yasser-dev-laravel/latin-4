<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    protected $fillable = [
        'title',
        'description',
        'duration',
        'course_id',
        'level_id',
        'teacher_id',
        'room_id',
        'start_time'
    ];

    protected $casts = [
        'start_time' => 'datetime'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
