<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $subjects = Subject::latest()->with('specialty')->with('course')->with('user')->get();

        if (is_null($subjects->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No subjects found',
            ], 404);
        }

        $response = [
            'status' => 'success',
            'message' => 'Subjects have been retrieved successfully',
            'data' => $subjects,
        ];

        return response()->json($response, 200);
    }

    public function indexUser($userId): \Illuminate\Http\JsonResponse
    {
        $subjects = Subject::where('user_id', $userId)->with('specialty')->with('course')->with('user')->get();

        if (is_null($subjects->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No subjects found',
            ], 404);
        }

        $response = [
            'status' => 'success',
            'message' => 'Subjects have been retrieved successfully',
            'data' => $subjects,
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
        $subject = Subject::create($request->all());

        $response = [
            'status' => 'success',
            'message' => 'Subject is added successfully',
            'data' => $subject,
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject): \Illuminate\Http\JsonResponse
    {
        // Eager load any relationships you want to include in the response:
        $subject->with('specialty')->with('course')->with('user')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Subject has been retrieved successfully',
            'data' => $subject,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subject $subject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        //
    }
}
