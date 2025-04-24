<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    protected $fillable = [
        'student_id',
        'course_id',
        'amount',
        'payment_method',
        'cashbox_id'
    ];

    protected $casts = [
        'amount' => 'decimal:2'
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function cashbox()
    {
        return $this->belongsTo(Cashbox::class);
    }
} 