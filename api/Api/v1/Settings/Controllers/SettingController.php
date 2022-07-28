<?php

namespace Api\v1\Settings\Controllers;

use Api\v1\Settings\Repositories\SettingRepository;
use Illuminate\Http\Request;
use Response;
use Illuminate\Http\Response as Res;
use Api\v1\Settings\Requests\SettingRequest;
use Api\v1\Settings\Models\Setting;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class SettingController extends Controller
{

    public $settingsRepository;

    public function __construct(SettingRepository $settingsRepository)
    {
        $this->settingsRepository = $settingsRepository;
    }

    public function index()
    {
        $settingInfo = $this->settingsRepository->first();
        return $this->respondCreated('Settings Info',$settingInfo);
    }

    public function update(SettingRequest $request)
    {
        try {
            $settingsInfo= $this->settingsRepository->first();
            $settings = $this->settingsRepository->update($request,$settingsInfo->id);
            if($settings){
                return $this->respondCreated('settings  Update ', $settings);
            }else{
                return $this->respondNotFound('settings  Not  Update ');
            }

        }catch(ModelNotFoundException $e){
            return $this->respondInternalError( 'Sorry, Operation Failed' );
        }
    }
}
