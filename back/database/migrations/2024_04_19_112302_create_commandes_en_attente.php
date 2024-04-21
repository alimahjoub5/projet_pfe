<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandesEnAttente extends Migration
{
    public function up()
    {
        Schema::create('commandes_en_attente', function (Blueprint $table) {
            $table->id('commande_id');
            $table->unsignedBigInteger('piece_id');
            $table->integer('requested_quantity');
            $table->date('order_date');
            $table->string('order_status', 50);
            $table->unsignedBigInteger('fournisseur_id');
            $table->date('expected_delivery_date')->nullable();
            $table->date('actual_delivery_date')->nullable();
            $table->timestamps();

            $table->foreign('piece_id')->references('piece_id')->on('pieces');
            $table->foreign('fournisseur_id')->references('fournisseur_id')->on('fournisseurs');
        });
    }

    public function down()
    {
        Schema::dropIfExists('commandes_en_attente');
    }
}
