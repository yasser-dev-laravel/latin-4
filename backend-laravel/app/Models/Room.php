<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'number', 'capacity', 'type', 'branch_id'];

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function lectures()
    {
        return $this->hasMany(Lecture::class);
    }
} 