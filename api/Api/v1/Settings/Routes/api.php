<?php

Route::prefix('api/v1/')
->namespace('Api\v1\Settings\Controllers')
->middleware([])
->group(function () {
    Route::get('/get-settings',[\Api\v1\Settings\Controllers\SettingController::class, 'index']);
    Route::post('/update-settings', [\Api\v1\Settings\Controllers\SettingController::class, 'update']);
});
