<?php

namespace Api\v1\Users\Models;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admins';
    protected $fillable = [];

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

    public function user()
    {
        return $this->morphOne(User::class,'userable');
    }
}
