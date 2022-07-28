<?php

namespace Api\v1\Fencing\Models;
use Illuminate\Database\Eloquent\Model;

class Fencing extends Model
{
    protected $table = 'geo_fencing';
    protected $fillable = ['fencing_id','vehicle_id','title','lat','long','radius','in_notification','out_notification','notification_status'];
    protected $primaryKey='fencing_id';
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
