<?php

namespace App\Providers;

use Api\v1\Users\Models\Admin;
use Api\v1\Users\Models\Customer;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Relation::morphMap([
            'admin'=>Admin::class,
            'customer'=>Customer::class,
        ]);
    }
}
