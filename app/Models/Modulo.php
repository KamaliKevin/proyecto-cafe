<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Especialidad;
use App\Models\Curso;
use App\Models\User;
use App\Models\Aula;
class Modulo extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'especialidad_id',
        'curso_id',
        'aula_id',
        'user_id'
    ];

    public function especialidad()
    {
        return $this->belongsTo(Especialidad::class);
    }
    public function curso()
    {
        return $this->belongsTo(Curso::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function aulas()
    {
        return $this->belongsToMany(Aula::class);
    }
}
