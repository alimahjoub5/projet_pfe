<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('UserID');
            $table->string('FirstName', 50);
            $table->string('LastName', 50);
            $table->string('Email', 100)->unique();
            $table->string('Username', 50)->unique();
            $table->string('Password', 100);
            $table->enum('Role', ['Admin', 'Technician', 'Manager', 'stockHolder']);
            $table->tinyInteger('Active')->default(1);
            $table->dateTime('CreatedOn')->nullable();
            $table->unsignedBigInteger('CreatedBy')->nullable();
            $table->dateTime('ModifiedOn')->nullable();
            $table->unsignedBigInteger('ModifiedBy')->nullable();
            $table->boolean('password_reset_requested')->default(false);

            $table->timestamps();

            $table->foreign('CreatedBy')->references('UserID')->on('users')->onDelete('set null');
            $table->foreign('ModifiedBy')->references('UserID')->on('users')->onDelete('set null');

            $table->index(['Role']);
            $table->index(['CreatedBy']);
            $table->index(['ModifiedBy']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
