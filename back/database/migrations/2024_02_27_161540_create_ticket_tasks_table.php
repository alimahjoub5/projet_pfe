<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
   public function up()
    {
        Schema::create('ticket_tasks', function (Blueprint $table) {
            $table->id('TicketTaskID');
            $table->unsignedBigInteger('TicketID');
            $table->unsignedBigInteger('CreatedBy');
            $table->dateTime('CreatedOn')->nullable();
            $table->unsignedBigInteger('ModifiedBy');
            $table->dateTime('ModifiedOn')->nullable();
            $table->unsignedBigInteger('StatusCodeID');
            $table->unsignedBigInteger('AssigneeID')->nullable();
            $table->string('Subject', 100);
            $table->text('Description')->nullable();
            $table->unsignedBigInteger('PriorityID');
            $table->date('DueDate');
            $table->dateTime('StartDate')->nullable();
            $table->dateTime('EndDate')->nullable();
            $table->dateTime('CompletedDate')->nullable();

            $table->foreign('TicketID')->references('TicketID')->on('tickets')->onDelete('cascade');
            $table->foreign('CreatedBy')->references('UserID')->on('users');
            $table->foreign('ModifiedBy')->references('UserID')->on('users');
            $table->foreign('StatusCodeID')->references('StatusCodeID')->on('ticket_status');
            $table->foreign('AssigneeID')->references('UserID')->on('users');
            $table->foreign('PriorityID')->references('PriorityID')->on('priorities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ticket_tasks');
    }
}
