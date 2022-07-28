<?php

Route::prefix('api/v1/')
->namespace('Api\v1\Fencing\Controllers')
->middleware([])
->group(function () {
    Route::resource('fencings','FencingController');
});
