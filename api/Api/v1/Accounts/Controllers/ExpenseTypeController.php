<?php

namespace Api\v1\Accounts\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Response;
use App\Http\Controllers\Controller;
use Api\v1\Accounts\Repositories\ExpenseTypeRepository;
use Api\v1\Accounts\Requests\ExpenseType;
class ExpenseTypeController extends Controller
{
    public $expenseTypeRepository;

    public function __construct(ExpenseTypeRepository $expenseTypeRepository)
    {
        $this->expenseTypeRepository = $expenseTypeRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( )
    {
        $expenseTypeList = $this->expenseTypeRepository->all();
        return $this->respondCreated('Expense Type List',$expenseTypeList);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ExpenseType $request)
    {
        try {
            $expenseType = $this->expenseTypeRepository->create($request);
            return $this->respondCreated('Expense Type Created ', $expenseType);
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ExpenseType $request, $id)
    {
        try {
            $expenseType = $this->expenseTypeRepository->update($request,$id);
            if($expenseType){
                return $this->respondCreated('Expense Type Update ', $expenseType);
            }else{
                return $this->respondNotFound('Expense Type Not  Update ');
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
            $expenseType = $this->expenseTypeRepository->delete($id);
            if($expenseType){
                 return $this->respondCreated('Expense Type Successfully Deleted');
            }else{
                return $this->respondNotFound('Expense Type Can Not Deleted');
            }
        }
        catch(ModelNotFoundException $e)
        {
            return $this->respondInternalError('Sorry, Operation Failed');
        }
    }
}
