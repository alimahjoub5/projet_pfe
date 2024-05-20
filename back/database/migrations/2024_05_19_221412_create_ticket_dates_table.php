<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketDatesTable extends Migration
{
    public function up()
    {
        Schema::create('ticket_dates', function (Blueprint $table) {
            $table->id('DateID'); // Identifiant unique de l'enregistrement des dates
            $table->unsignedBigInteger('TicketID')->unique(); // Identifiant du ticket
            $table->dateTime('datepriseencharge')->nullable(); // Date de clôture
            $table->dateTime('datedereparage')->nullable(); // Date de création
            $table->dateTime('datedevalidation')->nullable(); // Date de modification
            $table->timestamps(); // Ajoute les colonnes created_at et updated_at

            // Définition de la clé étrangère
            $table->foreign('TicketID')->references('TicketID')->on('tickets')->onDelete('cascade');
        });
    }


    public function down()
    {
        Schema::dropIfExists('ticket_dates');
    }
}
