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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('lastName')->nullable()->default(null);
            $table->string('email')->unique();
            $table->string('totalHours')->nullable()->default(null);
            $table->string('observations')->nullable()->default(null);
            $table->string('role')->default('teacher');

            $table->unsignedBigInteger('departamento_id')->foreign('departamento_id')->references('id')->on('departamentos')->nullable()->default(null);
            $table->unsignedBigInteger('especialidad_id')->foreign('especialidad_id')->references('id')->on('especialidads')->nullable()->default(null);

            $table->timestamp('email_verified_at')->nullable()->default(null);
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
