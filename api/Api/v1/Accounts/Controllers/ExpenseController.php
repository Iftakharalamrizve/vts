<?php

namespace Api\v1\Accounts\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Response;
use App\Http\Controllers\Controller;
use Api\v1\Accounts\Repositories\ExpenseRepository;
use Api\v1\Accounts\Requests\Expense;
class ExpenseController extends Controller
{
    public $expenseRepository;

    public function __construct(ExpenseRepository $expenseRepository)
    {
        $this->expenseRepository = $expenseRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( )
    {
        $expenseList = $this->expenseRepository->all();
        return $this->respondCreated('Expense Type List',$expenseList);
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
    public function store(Expense $request)
    {
        try {
            $expense = $this->expenseRepository->create($request);
            return $this->respondCreated('Expense  Created ', $expense);
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
    public function update(Expense $request, $id)
    {
        try {
            $expense = $this->expenseRepository->update($request,$id);
            if($expense){
                return $this->respondCreated('Expense  Update ', $expense);
            }else{
                return $this->respondNotFound('Expense  Not  Update ');
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
            $expense = $this->expenseRepository->delete($id);
            if($expense){
                return $this->respondCreated('Expense  Successfully Deleted');
            }else{
                return $this->respondNotFound('Expense  Can Not Deleted');
            }
        }
        catch(ModelNotFoundException $e)
        {
            return $this->respondInternalError('Sorry, Operation Failed');
        }
    }
}
