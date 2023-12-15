<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Subject;
use App\Models\Aula;
use App\Models\Curso;
use App\Models\Specialty;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $dep = new Department;
        $dep->name = "Informatica";
        $dep->save();
        $dep = new Department;
        $dep->name = "Cocina";
        $dep->save();

        $esp = new Specialty;
        $esp->name = "Sistemas y aplicaciones informaticas";
        $esp->save();
        $esp = new Specialty;
        $esp->name = "Informatica";
        $esp->save();

        $cur = new Curso;
        $cur->name = "1 DAW";
        $cur->turno = "Tarde";
        $cur->save();

        $aula = new Aula;
        $aula->name = "A21";
        $aula->save();



        $user = new User;
        $user->name = "Dani";
        $user->email = "Email";
        $user->totalHours = 9;
        $user->observations = "asdasdasd";
        $user->departamento_id = 1;
        $user->especialidad_id = 1;
        $user->password = "aaa";
        $user->save();

        $mod = new Subject;
        $mod->cod = "DEW";
        $mod->materia = "Desarrolo entorno cliente";
        $mod->especialidad_id = 1;
        $mod->curso_id = 1;
        $mod->save();
        $mod->especialidad;
        $mod->curso;

        $mod->aulas()->attach($aula);

        // Optional
        // $mod->aulas()->get();
        // $aula->modulos()->get();
        // $mod
    }
}
