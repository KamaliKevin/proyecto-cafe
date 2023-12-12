<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Modulo;

class Aula extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'modulo_id'
    ];

    public function modulos()
    {
        return $this->belongsToMany(Modulo::class);
    }
}
