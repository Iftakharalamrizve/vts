<?php

use Api\v1\Vehicles\Controllers\VehicleController;


Route::prefix('api/v1/')
->namespace('Api\v1\Vehicles\Controllers')
->middleware([])
->group(function () {
    Route::resource('vehicles','VehicleController');
    Route::post('/set-vehicle-speed/{id}', [VehicleController::class, 'setVehicleSpeedRate']);

});
