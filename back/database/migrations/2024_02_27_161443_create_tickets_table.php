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
            $table->unsignedBigInteger('ModifiedBy')->nullable();
            $table->dateTime('ModifiedOn')->nullable();
            $table->enum('StatusCodeID', ['nouveau', 'assigné','planifié', 'en_cours', 'résolu', 'cloturé'])->default('nouveau')->change();
            $table->unsignedBigInteger('AssigneeID')->nullable();
            $table->string('Subject', 100);
            $table->text('Description')->nullable();
            $table->enum('PriorityID', ['basse', 'normale', 'haute']); // Exemple de valeurs de priorité pour un ticket dans un système GMAO
            $table->unsignedBigInteger('GroupID')->nullable();
            $table->unsignedBigInteger('SocieteID')->nullable();
            $table->unsignedBigInteger('EquipmentTypeID')->nullable();
            $table->dateTime('StartDate')->nullable();
            $table->dateTime('EndDate')->nullable();
            $table->date('DueDate');
            $table->dateTime('ClosedDate')->nullable();

            $table->foreign('SocieteID')->references('SocieteID')->on('societe');
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
