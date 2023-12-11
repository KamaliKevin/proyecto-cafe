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
            $table->string('name');
            $table->unsignedBigInteger('curso_id')->foreign('curso_id')->references('id')->on('cursos');
            $table->unsignedBigInteger('user_id')->nullable()->default(null)->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('especialidad_id')->foreign('especialidad_id')->references('id')->on('especialidads');
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
