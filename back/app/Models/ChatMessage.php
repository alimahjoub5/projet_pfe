<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ChatMessage extends Model
{
    protected $table = 'chat_messages';
    protected $primaryKey = 'MessageID';

    protected $fillable = [
        'SenderID',
        'RecipientID',
        'MessageContent',
        'SentAt',
    ];

    protected $dates = [
        'SentAt',
        'created_at',
        'updated_at',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'SenderID');
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'RecipientID');
    }
}