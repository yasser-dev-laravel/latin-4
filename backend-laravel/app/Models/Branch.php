<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = ['name', 'address', 'phone'];

    public function departments()
    {
        return $this->hasMany(Department::class);
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    public function cashboxes()
    {
        return $this->hasMany(Cashbox::class);
    }
} 