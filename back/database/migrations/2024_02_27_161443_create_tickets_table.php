<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id('TicketID');
            $table->unsignedBigInteger('CreatedBy');
            $table->dateTime('CreatedOn')->nullable();
            $table->unsignedBigInteger('ModifiedBy');
            $table->dateTime('ModifiedOn')->nullable();
            $table->unsignedBigInteger('StatusCodeID');
            $table->unsignedBigInteger('AssigneeID')->nullable();
            $table->string('Subject', 100);
            $table->text('Description')->nullable();
            $table->unsignedBigInteger('PriorityID');
            $table->unsignedBigInteger('GroupID')->nullable();
            $table->unsignedBigInteger('EquipmentTypeID')->nullable();
            $table->dateTime('StartDate')->nullable();
            $table->dateTime('EndDate')->nullable();
            $table->date('DueDate');
            $table->dateTime('ClosedDate')->nullable();

            $table->foreign('CreatedBy')->references('UserID')->on('users');
            $table->foreign('ModifiedBy')->references('UserID')->on('users');
            $table->foreign('StatusCodeID')->references('StatusCodeID')->on('ticket_status');
            $table->foreign('AssigneeID')->references('UserID')->on('users');
            $table->foreign('PriorityID')->references('PriorityID')->on('priorities');
            $table->foreign('GroupID')->references('GroupID')->on('technician_groups');
            $table->foreign('EquipmentTypeID')->references('EquipmentTypeID')->on('equipment_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tickets');
    }
}
