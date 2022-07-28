<?php

namespace Api\v1\Accounts\Repositories;

use Api\v1\Accounts\Models\ExpenseType;
use Illuminate\Http\Request;

class ExpenseTypeRepository
{
    private  $model;

    public function __construct(ExpenseType $model)
    {
        $this->model=$model;
    }

    /**
    * @param $reqeust
    * @return
    */

    public function all()
    {
        return $this->model->get();
    }

    /**
    * @param $reqeust
    * @return ExpenseType
    */

    public function create(Request $request)
    {
        return $this->model->create($request->only($this->model->getModel()->getFillable()));
    }

    /**
    * @param $id
    * @return ExpenseType
    */
    public function find(int $id)
    {
        return $this->model->find($id);
    }


    /**
    * @param array $attributes
    *
    * @return ExpenseType
    */
    public function update(Request $request , int $id)
    {
        $findData = $this->model->find($id);
        return $findData ? tap($findData)->update($request->only ($this->model->getFillable ())) : null ;
    }

    /**
    * @param array $attributes
    *
    * @return ExpenseType
    */
    public function delete(int $id)
    {
        $findData = $this->model->find($id);
        return $findData?$findData->delete():null;
    }
}
