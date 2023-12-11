<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Especialidad;
use App\Models\Curso;
use App\Models\User;
class Modulo extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'especialidad_id'
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
}
