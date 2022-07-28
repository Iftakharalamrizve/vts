<?php

Route::prefix('api/v1/')
->namespace('Api\v1\Users\Controllers')
->middleware([])
->group(function () {
    Route::post('users/login','AuthController@login');
    Route::post('users/register','AuthController@register');
    Route::resource('users','UserController');
});
