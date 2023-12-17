<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('modulos', function (Blueprint $table) {
            $table->id();
            $table->string('cod');
            $table->string('materia');
            $table->string('weekDistribution')->default('0');
            $table->unsignedInteger('hours')->default(0);
            
            $table->unsignedBigInteger('curso_id')->foreign('curso_id')->references('id')->on('cursos');
            $table->unsignedBigInteger('especialidad_id')->foreign('especialidad_id')->references('id')->on('especialidads');
            $table->unsignedBigInteger('user_id')->nullable()->default(null)->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('aula_id')->nullable()->default(null)->foreign('aula_id')->references('id')->on('aulas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modulos');
    }

    
};
