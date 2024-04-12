<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStocksTable extends Migration
{
    public function up()
    {
        Schema::create('stocks', function (Blueprint $table) {
            $table->id('stock_id');
            $table->string('nom_piece');
            $table->text('description')->nullable(); // Ajout du champ description
            $table->text('image_piece')->nullable();
            $table->integer('quantite');
            $table->integer('quantite_reservee');
            $table->integer('seuil_min');
            $table->integer('seuil_max');
            $table->unsignedBigInteger('fournisseur_id');
            $table->foreign('fournisseur_id')->references('fournisseur_id')->on('fournisseurs');
            $table->integer('created_by');
            $table->integer('modify_by');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('stocks');
    }
}
