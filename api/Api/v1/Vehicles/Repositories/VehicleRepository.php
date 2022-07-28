<?php

namespace Api\v1\Vehicles\Repositories;

use Api\v1\Vehicles\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleRepository
{
    private  $model;

    public function __construct(Vehicle $model)
    {
        $this->model=$model;
    }

    /**
     * @param $reqeust
     * @return
     */

    public function all($query = null)
    {
        if($query){
            return $this->model->where('band', 'like', '%' . $query . '%')
            ->orWhere('model_number', 'like', '%' . $query . '%')
            ->orWhere('plate_number', 'like', '%' . $query . '%')->limit(2)->get();
        }
        return $this->model->limit(2)->get();
    }

    public function setSpeedRate($request , $id)
    {
        $findData = $this->model->find($id);
        return $findData ? tap($findData)->update($request->only ($this->model->getModel()->getFillable())) : null ;
    }


}
