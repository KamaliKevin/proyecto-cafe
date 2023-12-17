<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Modulo;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'turno',
        'grade'
    ];

    public function modulos()
    {
        return $this->hasMany(Modulo::class);
    }
}
