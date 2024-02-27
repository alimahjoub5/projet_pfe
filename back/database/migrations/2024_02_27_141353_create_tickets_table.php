<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->unsignedBigInteger('CreatedBy')->nullable(false);
            $table->dateTime('CreatedOn')->nullable(false);
            $table->unsignedBigInteger('ModifiedBy')->nullable(false);
            $table->dateTime('ModifiedOn')->nullable(false);
            $table->unsignedBigInteger('StatusCodeID')->nullable(false);
            $table->unsignedBigInteger('AssigneeID')->nullable();
            $table->string('Subject', 100)->nullable(false);
            $table->text('Description')->nullable(false);
            $table->unsignedBigInteger('PriorityID')->nullable(false);
            $table->unsignedBigInteger('ChannelID')->nullable(false);
            $table->dateTime('StartDate')->nullable();
            $table->dateTime('EndDate')->nullable();
            $table->date('DueDate')->nullable(false);
            $table->dateTime('ClosedDate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
