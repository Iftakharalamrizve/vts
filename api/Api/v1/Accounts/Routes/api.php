<?php

Route::prefix('api/v1/')
->namespace('Api\v1\Accounts\Controllers')
->middleware([])
->group(function () {
    Route::resource('expense-types','ExpenseTypeController');
    Route::resource('expenses','ExpenseController');
});
