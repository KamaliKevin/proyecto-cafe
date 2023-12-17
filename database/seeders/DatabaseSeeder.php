<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Departamento;
use App\Models\Modulo;
use App\Models\Aula;
use App\Models\Curso;
use App\Models\Especialidad;
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

        $dep = new Departamento;
        $dep->name = "Informatica";
        $dep->save();
        $dep = new Departamento;
        $dep->name = "Cocina";
        $dep->save();

        $esp = new Especialidad;
        $esp->name = "Sistemas y aplicaciones informaticas";
        $esp->save();
        $esp = new Especialidad;
        $esp->name = "Informatica";
        $esp->save();

        $cur = new Curso;
        $cur->name = "1 DAW";
        $cur->turno = "Tarde";
        $cur->save();

        $aula = new Aula;
        $aula->name = "A21";
        $aula->save();
        $aula = new Aula;
        $aula->name = "A27";
        $aula->save();


        $user = new User;
        $user->name = "Dani";
        $user->lastName = "Rodríguez Ravelo";
        $user->email = "email@gmail.com";
        $user->observations = "asdasdasd";
        $user->departamento_id = 1;
        $user->especialidad_id = 1;
        $user->password = "aaa";
        $user->save();

        $user = new User;
        $user->name = "Ignacio";
        $user->lastName = "Revilla";
        $user->email = "email1@gmail.com";
        $user->observations = "asdasdasd";
        $user->departamento_id = 2;
        $user->especialidad_id = 2;
        $user->password = "aaa";
        $user->save();

        $mod = new Modulo;
        $mod->cod = "DSW";
        $mod->materia = "Desarrollo entorno web";
        $mod->hours = 9;
        $mod->especialidad_id = 1;
        $mod->curso_id = 1;
        $mod->user_id = 1;
        $mod->save();

        $mod = new Modulo;
        $mod->cod = "IDK";
        $mod->materia = "Ingles";
        $mod->hours = 3;
        $mod->especialidad_id = 1;
        $mod->curso_id = 1;
        $mod->user_id = 2;
        $mod->save();

        $mod = new Modulo;
        $mod->cod = "RED";
        $mod->materia = "Redes";
        $mod->hours = 1;
        $mod->especialidad_id = 1;
        $mod->curso_id = 1;
        $mod->user_id = 1;
        $mod->save();

        $mod = new Modulo;
        $mod->cod = "DPL";
        $mod->materia = "Despliegue servidor";
        $mod->hours = 5;
        $mod->especialidad_id = 1;
        $mod->curso_id = 1;
        $mod->user_id = 1;
        $mod->save();
    }
}
