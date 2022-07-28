<?php

namespace Api\v1\Users\Controllers;

use Api\v1\Users\Models\Admin;
use DB;
use App\Http\Controllers\Controller;
use Api\v1\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Api\v1\Users\Services\UserService;

class AuthController extends Controller
{
    /**
     * This method is used to check if an user is authenticated
     * @author Md. Asif Rahman
     * @param $request Request
     * @return json
     */
    public function login(Request $request)
    {
        return $this->validateUserAndGenerateToken($request->userType,$request);
    }

    public function register(Request $request, UserService $userService)
    {
        $userService->saveUser(new Admin(),$request);
    }

    public function logout()
    {
        $user = request()->user(); //or Auth::user()
        // Revoke current user token
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
    }

    /**
     * This method is used to authenticate any types of users
     * and generate access token
     */
    private function validateUserAndGenerateToken($userType,$request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::whereEmail($request->email)->whereUserableType($userType)
                ->whereStatus(User::IS_ACTIVE)->first();

        if(!$user || !Hash::check($request->password,$user->password))
        {
            throw ValidationException::withMessages([
                'email'=>'The provided credentials are not correct'
            ]);
        }

        $token=$user->createToken($request->email)->plainTextToken;
        return $this->respondWithToken($token,$user);
    }
}



