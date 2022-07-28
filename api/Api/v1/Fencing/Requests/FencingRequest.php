<?php

namespace Api\v1\Fencing\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FencingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        $fields =  [
            'vehicle_id'=>'required',
            'lat'=>'required',
            'long'=>'required',
            'radius'=>'required',
            'in_notification'=>'required',
            'out_notification'=>'required',
            'notification_status'=>'required',
            'title'=>'required|unique:geo_fencing,title'
        ];

        return  $fields ;

    }

    /**
     * attributes can be changed here like the following
     * 'user_name'=>'User Name', or 'user_name'=>trnas('your_translation_file.user_name')
     * @return [type] [description]
     */
    public function attributes()
    {
        return [
            //
        ];
    }

    /**
     * form validation messages can be changed and translated by this method like the following
     * 'user_name.required'=>'Please provide user name' or 'user_name.required'=>trans('your_translation_file.user_name_msg')
     * @return [type] [description]
     */
    public function messages()
    {
        return [
            //
        ];
    }

}
