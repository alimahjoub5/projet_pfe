<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandesTable extends Migration
{
    public function up()
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->id('commande_id');
            $table->dateTime('date_commande');
            $table->dateTime('date_livraison_prevue');
            $table->dateTime('date_livraison_effective')->nullable();
            $table->string('statut');
            $table->unsignedBigInteger('fournisseur_id');
            $table->foreign('fournisseur_id')->references('fournisseur_id')->on('fournisseurs');
            $table->double('total_commande');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('commandes');
    }
}
