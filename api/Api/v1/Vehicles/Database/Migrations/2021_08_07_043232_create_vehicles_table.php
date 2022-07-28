<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->increments ('vehicle_id');
            $table->integer('vehicle_type_id');
            $table->unsignedBigInteger ('user_id');
            $table->integer ('over_speed_limit')->default (60);
            $table->string ('band')->nullable ();
            $table->string ('model')->nullable ();
            $table->string ('model_number')->nullable ();
            $table->string ('plate_number')->nullable ();
            $table->string('vehicle_seats')->nullable();
            $table->decimal('fuel_tank_capacity', 10,2)->nullable();
            $table->date('insurance_expire_date')->nullable ();
            $table->date('registration_expire_date')->nullable();
            $table->date('tax_token_expire_date')->nullable();
            $table->date('registration_year')->nullable();
            $table->decimal('vehicle_kpl', 10,2)->nullable();
            $table->tinyInteger ('status')->default (1);
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
        Schema::dropIfExists('vehicles');
    }
}
