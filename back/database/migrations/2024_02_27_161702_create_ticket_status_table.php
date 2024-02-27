<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ticket_status', function (Blueprint $table) {
            $table->id('StatusCodeID');
            $table->string('StatusName', 50);
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
        Schema::dropIfExists('ticket_status');
    }
}
