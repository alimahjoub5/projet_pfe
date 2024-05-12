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
            $table->string('Subject', 100);
            $table->text('Description')->nullable();
            $table->enum('StatusCodeID', ['nouveau','planifie', 'en_cours', 'resolu', 'cloture'])->default('nouveau');
            $table->enum('PriorityID', ['basse', 'normale', 'haute']);
            
            $table->unsignedBigInteger('GroupID')->nullable();
            $table->unsignedBigInteger('SocieteID')->nullable();
            $table->unsignedBigInteger('EquipmentTypeID')->nullable();
            $table->unsignedBigInteger('AssigneeID')->nullable();

            $table->dateTime('StartDate')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('ClosedDate')->nullable();
            $table->enum('StatusValidation', ['true', 'false'])->default('false');
            $table->enum('TicketType', ['curative', 'préventive'])->nullable();
            $table->dateTime('ModifiedOn')->nullable();

            $table->unsignedBigInteger('CreatedBy');
            $table->dateTime('CreatedOn')->nullable();
            $table->unsignedBigInteger('ModifiedBy')->nullable();


            $table->foreign('SocieteID')->references('SocieteID')->on('societe');
            $table->foreign('CreatedBy')->references('UserID')->on('users');
            $table->foreign('ModifiedBy')->references('UserID')->on('users');
            $table->foreign('AssigneeID')->references('UserID')->on('users');
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
