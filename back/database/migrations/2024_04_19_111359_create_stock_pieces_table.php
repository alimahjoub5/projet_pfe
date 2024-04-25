<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStockPiecesTable extends Migration
{
    public function up()
    {
        Schema::create('stock_pieces', function (Blueprint $table) {
            $table->id('stock_id');
            $table->unsignedBigInteger('piece_id');
            $table->unsignedBigInteger('equipment_id')->nullable();
            $table->integer('quantity');
            $table->integer('reserved_quantity')->default(0);
            $table->string('local', 255);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('modify_by')->nullable();
            $table->timestamps();

            $table->foreign('piece_id')->references('piece_id')->on('pieces');
            $table->foreign('equipment_id')->references('EquipmentTypeID')->on('equipment_types'); // Peut-être également modifier ici
        });
    }

    public function down()
    {
        Schema::dropIfExists('stock_pieces');
    }
}
