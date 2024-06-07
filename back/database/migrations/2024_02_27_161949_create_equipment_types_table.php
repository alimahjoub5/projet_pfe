<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipmentTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipment_types', function (Blueprint $table) {
            $table->id('EquipmentTypeID');
            $table->string('TypeName', 50)->unique();
            $table->text('Description')->nullable();
            $table->string('Manufacturer', 100)->nullable();
            $table->string('ModelNumber', 50)->nullable();
            $table->string('SerialNumber', 50)->nullable();
            $table->date('InstallationDate')->nullable();
            $table->date('WarrantyExpiration')->nullable();
            $table->integer('MaintenanceInterval')->nullable();
            $table->dateTime('LastMaintenanceDate')->nullable();
            $table->unsignedBigInteger('CreatedBy')->nullable();
            $table->dateTime('CreatedOn')->nullable();
            $table->unsignedBigInteger('ModifiedBy')->nullable();
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
        Schema::dropIfExists('equipment_types');
    }
}
