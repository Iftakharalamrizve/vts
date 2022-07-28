<?php

namespace Api\v1\Users\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory,Notifiable,HasApiTokens;

    protected $table = 'users';
    protected $fillable = [];
    public const IS_ACTIVE='1';
    protected $with=['userable'];

    protected $guarded=['status'];

    protected $hidden=[
        'password'
    ];

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

    public function userable()
    {
        return $this->morphTo();
    }
    
}
