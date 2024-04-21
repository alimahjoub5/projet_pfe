<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePiecesTable extends Migration
{
    public function up()
    {
        Schema::create('pieces', function (Blueprint $table) {
            $table->id('piece_id');
            $table->string('nom_piece');
            $table->text('description')->nullable();
            $table->string('image_piece')->nullable();
            $table->string('material', 100)->nullable();
            $table->string('serial_number', 100)->nullable();
            $table->date('fabrication_date')->nullable();
            $table->date('expiration_date')->nullable();
            $table->decimal('cost', 10, 2)->nullable();
            $table->unsignedBigInteger('fournisseur_id')->nullable();
            $table->timestamps();

            $table->foreign('fournisseur_id')->references('fournisseur_id')->on('fournisseurs');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pieces');
    }
}
