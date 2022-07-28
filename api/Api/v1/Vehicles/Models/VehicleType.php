<?php

namespace Api\v1\Vehicles\Models;

use Api\v1\Accounts\Models\ExpenseType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleType extends Model
{
    protected $table = 'vehicle_types';
    protected $primaryKey = 'vehicle_type_id';
    protected $fillable = [
        'vehicle_type_id','vehicle_type_name','logo','status'
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function($model){
        });

        static::updating(function($model){
        });

        static::deleting(function($model){

        });

    }
}
