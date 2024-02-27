<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTechnicianGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_technician_groups', function (Blueprint $table) {
            $table->unsignedBigInteger('UserID');
            $table->unsignedBigInteger('GroupID');
            $table->primary(['UserID', 'GroupID']);
            $table->foreign('UserID')->references('UserID')->on('users')->onDelete('cascade');
            $table->foreign('GroupID')->references('GroupID')->on('technician_groups')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_technician_groups');
    }
}
