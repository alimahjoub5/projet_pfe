<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailsCommandesTable extends Migration
{
    public function up()
    {
        Schema::create('details_commandes', function (Blueprint $table) {
            $table->id('detail_id');
            $table->unsignedBigInteger('commande_id');
            $table->unsignedBigInteger('stock_id');
            $table->integer('quantite_commandee');
            $table->integer('quantite_recue');
            $table->double('prix_unitaire');
            $table->double('montant_total');
            $table->foreign('commande_id')->references('commande_id')->on('commandes');
            $table->foreign('stock_id')->references('stock_id')->on('stocks');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('details_commandes');
    }
}
