<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTechnicianGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('technician_groups', function (Blueprint $table) {
            $table->id('GroupID');
            $table->string('GroupName', 50)->unique();
            $table->text('Description')->nullable();
            $table->integer('CreatedBy')->nullable();
            $table->dateTime('CreatedOn')->nullable();
            $table->integer('ModifiedBy')->nullable();
            $table->dateTime('ModifiedOn')->nullable();
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
        Schema::dropIfExists('technician_groups');
    }
}
