<?php

namespace Api\v1\Users\Controllers;

use Illuminate\Http\Request;
use Response;
use Illuminate\Http\Response as Res;
use Api\v1\Users\Requests\UserRequest;
use Api\v1\Users\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [];
        $data['users'] = User::all();
        return Response::json($data,Res::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = [];
        return Response::json($data,Res::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        try{
            $user = new User();
            $data = $request->only($user->getFillable());
            $user->fill($data)->save();
            return Response::json($data,Res::HTTP_CREATED);
        }
        catch(ModelNotFoundException $e)
        {
            return Response::json('Sorry, Operation Failed',Res::HTTP_NOT_FOUND);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try
        {
            $data['user'] = User::findOrFail($id);
            return Response::json($data,Res::HTTP_OK);
        }
        catch(ModelNotFoundException $e)
        {
            return Response::json('Sorry the data is not found',Res::HTTP_NOT_FOUND);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        try
        {
            $data['user'] = User::findOrFail($id);
            return Response::json($data,Res::HTTP_OK);
        }
        catch(ModelNotFoundException $e)
        {
            return Response::json('Sorry the data is not found',Res::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, $id)
    {
        try
        {
            $user = User::findOrFail($id);
            $data = $request->only($user->getFillable());
            $user->update($data);
            return Response::json($data,Res::HTTP_CREATED);
        }
        catch(ModelNotFoundException $e)
        {
            return Response::json('Sorry, Operation Failed',Res::HTTP_NOT_FOUND);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try
        {
            $user = User::findOrFail($id);
            if($user->delete()){
                return Response::json([
                    'message' => 'Succefully Deleted',
                    'status' => true
                ],Res::HTTP_OK);
            }else{
                return Response::json([
                    'message' => "Cannot be deleted",
                    'status' => false
                ],Res::HTTP_NOT_FOUND );
            }
        }
        catch(ModelNotFoundException $e)
        {
            return Response::json('Sorry, Operation Failed',Res::HTTP_NOT_FOUND);
        }
    }
}