<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Specialty;
use App\Models\Course;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'hours',
        'classroom',
        'distribution',
        'comments',
        'user_id',
        'course_id',
        'specialty_id'
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
