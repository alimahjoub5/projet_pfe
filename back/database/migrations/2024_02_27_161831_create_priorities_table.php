<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrioritiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('priorities', function (Blueprint $table) {
            $table->id('PriorityID');
            $table->string('Name', 50);
            $table->unsignedBigInteger('CreatedBy');
            $table->dateTime('CreatedOn')->nullable();
            $table->unsignedBigInteger('ModifiedBy');
            $table->dateTime('ModifiedOn')->nullable();

            $table->foreign('CreatedBy')->references('UserID')->on('users');
            $table->foreign('ModifiedBy')->references('UserID')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('priorities');
    }
}
