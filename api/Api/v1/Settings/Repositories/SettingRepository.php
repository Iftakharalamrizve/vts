<?php

namespace Api\v1\Settings\Repositories;
use Api\v1\Settings\Models\Setting;
use Illuminate\Http\Request;
class SettingRepository
{
    private  $model;

    public function __construct(Setting $model)
    {
        $this->model=$model;
    }

    /**
     * @param $reqeust
     * @return
     */

    public function first()
    {
        return $this->model->first();
    }

    public function update(Request $request , int $id)
    {
        $findData = $this->model->find($id);
        return $findData ? tap($findData)->update($request->only ($this->model->getFillable ())) : null ;
    }
}
