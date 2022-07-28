<?php

namespace Api\v1\Fencing\Controllers;

use Response;
use Api\v1\Fencing\Requests\FencingRequest;
use Illuminate\Http\Request;
use Api\v1\Fencing\Repositories\FencingRepository;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class FencingController extends Controller
{
    public $fencingRepository;

    public function __construct(FencingRepository $fencingRepository)
    {
        $this->fencingRepository = $fencingRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fencingList = $this->fencingRepository->all();
        return $this->respondCreated('Fencing Type List',$fencingList);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(FencingRequest $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FencingRequest $request)
    {
        try {
            $fencing = $this->fencingRepository->create($request);
            return $this->respondCreated('Fencing  Created ', $fencing);
        }catch(ModelNotFoundException $e){
            return $this->respondInternalError( 'Sorry, Operation Failed' );
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

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit( $id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $fencing = $this->fencingRepository->update($request,$id);
            if($fencing){
                return $this->respondCreated('Fencing  Update ', $fencing);
            }else{
                return $this->respondNotFound('Fencing  Not  Update ');
            }

        }catch(ModelNotFoundException $e){
            return $this->respondInternalError( 'Sorry, Operation Failed' );
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
            $fencing = $this->fencingRepository->delete($id);
            if($fencing){
                return $this->respondCreated('Fencing  Successfully Deleted');
            }else{
                return $this->respondNotFound('Fencing  Can Not Deleted');
            }
        }
        catch(ModelNotFoundException $e)
        {
            return $this->respondInternalError('Sorry, Operation Failed');
        }
    }
}
