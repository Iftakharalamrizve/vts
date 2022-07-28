<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('app_notification')->default ( 0);
            $table->tinyInteger('email_notification')->default ( 0);
            $table->tinyInteger('over_speed_alert')->default ( 0);
            $table->tinyInteger('range_alert')->default ( 0);
            $table->tinyInteger('sms_option')->default ( 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
