<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $fillable = ['name', 'code', 'description'];

    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }

    public function lectures()
    {
        return $this->hasMany(Lecture::class);
    }

    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }
} 