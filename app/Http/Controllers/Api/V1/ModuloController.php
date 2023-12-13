<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Modulo;
use Illuminate\Http\Request;

class ModuloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $modulos = Modulo::latest()->with('especialidad')->with('curso')->with('user')->with('aulas')->get();

        if (is_null($modulos->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No product found!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'modulos are retrieved successfully.',
            'data' => $modulos,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $validate = Validator::make($request->all(), [
        //     'name' => 'required|string|max:250',
        //     'description' => 'required|string|'
        // ]);

        // if($validate->fails()){  
        //     return response()->json([
        //         'status' => 'failed',
        //         'message' => 'Validation Error!',
        //         'data' => $validate->errors(),
        //     ], 403);    
        // }


        // protected $fillable = [
        //     'cod',
        //     'materia',
        //     'especialidad_id',
        //     'curso_id',
        //     'aula_id',
        //     'user_id'
        // ];
        $product = Modulo::create($request->all());

        $response = [
            'status' => 'success',
            'message' => 'Product is added successfully.',
            'data' => $product,
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Modulo $modulo)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Modulo $modulo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Modulo $modulo)
    {
        //
    }
}
