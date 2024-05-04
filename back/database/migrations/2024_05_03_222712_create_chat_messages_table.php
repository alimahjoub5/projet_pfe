<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreateChatMessagesTable extends Migration
{
    public function up()
    {
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->bigIncrements('MessageID');
            $table->unsignedBigInteger('SenderID');
            $table->unsignedBigInteger('RecipientID');
            $table->text('MessageContent');
            $table->timestamp('SentAt');
            $table->timestamps();

            $table->foreign('SenderID')->references('UserID')->on('users');
            $table->foreign('RecipientID')->references('UserID')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('chat_messages');
    }
}
