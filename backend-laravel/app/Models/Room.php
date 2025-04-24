<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['name', 'capacity', 'branch_id'];

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function lectures()
    {
        return $this->hasMany(Lecture::class);
    }
} 