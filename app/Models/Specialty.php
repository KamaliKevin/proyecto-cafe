<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Subject;
use App\Models\User;

class Specialty extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function subjects(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Subject::class);
    }
    public function users(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(User::class);
    }
}
