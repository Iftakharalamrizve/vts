<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableFencings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('geo_fencing', function (Blueprint $table) {
            $table->increments('fencing_id');
            $table->unsignedBigInteger ('vehicle_id');
            $table->string  ('title');
            $table->decimal ('lat',8, 2);
            $table->decimal ('long',8, 2);
            $table->double ('radius');
            $table->tinyInteger ('in_notification')->default (1);
            $table->tinyInteger ('out_notification')->default (1);
            $table->tinyInteger ('notification_status')->default (1);
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
        Schema::dropIfExists('fencings');
    }
}
