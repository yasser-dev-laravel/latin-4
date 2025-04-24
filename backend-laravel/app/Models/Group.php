<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'course_id',
        'level',
        'instructor_id',
        'room_id',
        'start_date',
        'days',
        'start_time',
        'end_date',
        'status',
        'students'
    ];

    protected $casts = [
        'days' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
        'start_time' => 'datetime'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'group_students')
            ->withPivot('status')
            ->withTimestamps();
    }
}
