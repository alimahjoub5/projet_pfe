<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFournisseursTable extends Migration
{
    public function up()
    {
        Schema::create('fournisseurs', function (Blueprint $table) {
            $table->id('fournisseur_id');
            $table->string('nom_fournisseur');
            $table->string('adresse');
            $table->string('email', 50);
            $table->string('telephone');
            $table->integer('created_by')->nullable(); // Ajout de la colonne created_by
            $table->integer('modify_by')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('fournisseurs');
    }
}
