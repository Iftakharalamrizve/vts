<?php

namespace Api\v1\Settings\Models;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $table = 'settings';
    protected $fillable = ['app_notification','email_notification','over_speed_alert','range_alert','sms_option'];

    public static function boot()
    {
        parent::boot();
        static::creating(function($model){
            //you can save any field value on inserting data into a table
            //for example $model->created_by=Auth::user()->id
        });

        static::updating(function($model){
            //you can save any field value on updating data into a table
            //for example $model->updated_by=Auth::user()->id
        });
    }
}
