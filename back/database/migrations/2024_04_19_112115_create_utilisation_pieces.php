<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUtilisationPieces extends Migration
{
    public function up()
    {
        Schema::create('utilisation_pieces', function (Blueprint $table) {
            $table->id('utilisation_id');
            $table->unsignedBigInteger('EquipmentTypeID');
            $table->unsignedBigInteger('piece_id');
            $table->integer('quantity_used');
            $table->date('date_utilisation');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('EquipmentTypeID')->references('EquipmentTypeID')->on('equipment_types');
            $table->foreign('piece_id')->references('piece_id')->on('pieces');
        });
    }

    public function down()
    {
        Schema::dropIfExists('utilisation_pieces');
    }
}
