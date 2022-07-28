<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->increments('expense_id');
			$table->bigInteger('expense_type_id')->comment(' foreign key  Expense Type table');
			$table->bigInteger('vehicle_id')->comment(' foreign key Vehicle table');
            $table->string('purpose');
			$table->float('amount');
			$table->date('date');
			$table->string('document_image', 256)->nullable();
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
        Schema::dropIfExists('expenses');
    }
}
