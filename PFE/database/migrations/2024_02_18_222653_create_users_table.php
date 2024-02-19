<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('UserID');
            $table->string('FirstName', 50);
            $table->string('LastName', 50);
            $table->string('Email', 100);
            $table->string('Username', 50);
            $table->string('Password', 100);
            $table->enum('Role', ['Admin', 'Technician', 'Manager']);
            $table->tinyInteger('Active')->default(1);
            $table->dateTime('CreatedOn');
            $table->integer('CreatedBy');
            $table->dateTime('ModifiedOn')->nullable();
            $table->integer('ModifiedBy')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
