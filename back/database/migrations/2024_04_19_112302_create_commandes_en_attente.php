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
            $table->timestamp('order_date')->default(DB::raw('CURRENT_TIMESTAMP')); // Utilisez timestamp au lieu de date
            $table->enum('order_status', ['en_attente', 'Annuler', 'livree'])->default('en_attente');
            $table->unsignedBigInteger('fournisseur_id');
            $table->date('expected_delivery_date')->nullable();
            $table->date('actual_delivery_date')->nullable();
            $table->string('facture_url')->nullable(); // Champ facture_url ajouté
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
