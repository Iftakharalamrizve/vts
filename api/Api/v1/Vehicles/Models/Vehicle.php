<?php

namespace Api\v1\Vehicles\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $table = 'vehicles';
    protected $primaryKey = 'vehicle_id';
    protected $fillable = [
        'vehicle_id','vehicle_type_id','user_id','status','over_speed_limit','model','band',
        'model_number','plate_number','vehicle_seats','fuel_tank_capacity','insurance_expire_date',
        'registration_expire_date','tax_token_expire_date','registration_year','vehicle_kpl','c_lat','c_lan','status'
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
