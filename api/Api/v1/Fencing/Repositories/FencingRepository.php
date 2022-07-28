<?php

namespace Api\v1\Fencing\Repositories;

use Api\v1\Fencing\Models\Fencing;
use Illuminate\Http\Request;

class FencingRepository
{
    private  $model;

    public function __construct(Fencing $model)
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
     * @return
     */
    public function find(int $id)
    {
        return $this->model->find($id);
    }


    /**
     * @param array $attributes
     *
     * @return
     */
    public function update(Request $request ,  $id)
    {
        $findData = $this->model->find($id);
        return $findData ? tap($findData)->update($request->only ($this->model->getModel()->getFillable())) : null ;
    }

    /**
     * @param array $attributes
     *
     * @return
     */
    public function delete(int $id)
    {
        $findData = $this->model->find($id);
        return $findData?$findData->delete():null;
    }
}
