<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Subject;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'grade',
        'shift_time'
    ];

    public function subjects(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Subject::class);
    }
}
