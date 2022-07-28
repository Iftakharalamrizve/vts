<?php

namespace Api\v1\Users\Services;

use Api\v1\Users\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function saveUser(Model $userType,Request $request)
    {
        DB::transaction(function () use($userType) {
            $userType->save();
            $userType->user()->create();
        });

    }

    public function updateUser($user,$association,$userId)
    {

    }

    public function updateUserStaus($userId)
    {

    }

    public function deleteUser($userId)
    {

    }
}
