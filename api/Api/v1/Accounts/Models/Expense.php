<?php

namespace Api\v1\Accounts\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Expense extends Model
{
    protected $table = 'expenses';
    protected $primaryKey = 'expense_id';
    protected $fillable = [
         'expense_type_id','vehicle_id','purpose', 'amount', 'date','document_image'
    ];

    public function expenseType()
    {
        return $this->belongsTo (ExpenseType::class,'expense_type_id');
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function($model){
            $date=date_create($model->date);
            $model->date = date_format($date,"Y-m-d");
        });

        static::updating(function($model){
            $date=date_create($model->date);
            $model->date = date_format($date,"Y-m-d");
        });

        static::deleting(function($model){

        });

    }
}
