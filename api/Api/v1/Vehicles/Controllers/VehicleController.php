<?php

namespace Api\v1\Vehicles\Controllers;

use Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Api\v1\Vehicles\Repositories\VehicleRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class VehicleController extends Controller
{
    public $vehicleRepository;

    public function __construct(VehicleRepository $vehicleRepository)
    {
        $this->vehicleRepository = $vehicleRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $vehicleList = $this->vehicleRepository->all($request->search);
        return $this->respondCreated('Vehicle  List',$vehicleList);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function setVehicleSpeedRate(Request $request , $id)
    {
        $vehicleSpeedInfo = $this->vehicleRepository->setSpeedRate($request,$id);
        return $this->respondCreated('Vehicle  Speed Info',$vehicleSpeedInfo);
    }
}
