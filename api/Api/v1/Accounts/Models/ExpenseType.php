<?php

namespace Api\v1\Accounts\Models;

use Illuminate\Database\Eloquent\Model;

class ExpenseType extends Model
{

    protected $table = 'expense_types';
    protected $primaryKey = 'expense_type_id';
    // expense_type_id
    protected $fillable = ['title','description','status','created_by'];

    public function expenses()
    {
        return $this->hasMany(Expense::class,'expense_type_id');
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function($model){
            $model->created_by = 1;
        });

        static::updating(function($model){

        });

        static::deleting(function($model){
            // $model->expense()->delete();
        });

    }

}
