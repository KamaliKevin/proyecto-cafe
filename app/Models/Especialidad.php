<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Modulo;
use App\Models\User;

class Especialidad extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function modulos()
    {
        return $this->hasMany(Modulo::class);
    }
    public function usuarios()
    {
        return $this->hasMany(User::class);
    }
}
