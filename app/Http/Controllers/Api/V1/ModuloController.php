<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Modulo;
use Illuminate\Http\Request;
use App\Models\User;

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

    public function indexTeacher($teachId)
    {
        $modulos = Modulo::where('user_id', $teachId)->with('especialidad')->with('curso')->with('user')->with('aulas')->get();

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

    public function removeTeacherIndex($moduloID)
    {
        $mod = Modulo::findOrFail($moduloID);

        if (is_null($mod)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No module found!',
            ], 200);
        }

        $mod->user_id = null;
        $mod->save();

        $response = [
            'status' => 'success',
            'message' => 'teacher has been dissociated.',
        ];
        return response()->json( $response ,200);
    }

    public function indexTeacherMissing($teachID)
    {
        $user = User::findOrFail($teachID);

        $modulos = Modulo::where('especialidad_id', $user->especialidad_id)
            ->whereDoesntHave('user', function ($query) use ($teachID) {
                $query->where('user_id', $teachID);
            })
            ->with('especialidad')
            ->get();


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

    public function addTeacher(Request $request)
    {
        $moduloID = $request['moduloID'];
        $teachID = $request['teachID'];
        
        $mod = Modulo::findOrFail($moduloID);
        $user = User::findOrFail($teachID);



        if (is_null($mod->first()) || is_null($user->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'One of the parameters not found',
            ], 200);
        }

        $mod -> user_id = $user->id;
        $mod -> weekDistribution = $request['weekDistribution'];
        $mod -> observations =  $request['observations'];
        $mod -> save();
        $response = [
            'status' => 'success',
            'message' => 'Teacher has been associated successfully',
            'data' => $mod,
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
    public function show($id)
    {
        $modulo = Modulo::where('id', $id)->with('aulas')->with('curso')->get();
        return response()->json($modulo, 200);
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
