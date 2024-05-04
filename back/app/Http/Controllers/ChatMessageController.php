<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChatMessage;
use App\Models\User;
class ChatMessageController extends Controller
{



    public function sendMessage(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'SenderID' => 'required|exists:users,UserID',
                'RecipientID' => 'required|exists:users,UserID',
                'MessageContent' => 'required|string',
            ]);
    
    
            $message = ChatMessage::create($validatedData);
    
    
            return response()->json(['message' => 'Message sent successfully', 'data' => $message], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to send message : '.$e], 500);
        }
    }
    

    public function getMessages($senderId, $recipientId)
    {
        $messages = ChatMessage::where(function ($query) use ($senderId, $recipientId) {
            $query->where('SenderID', $senderId)->where('RecipientID', $recipientId);
        })->orWhere(function ($query) use ($senderId, $recipientId) {
            $query->where('SenderID', $recipientId)->where('RecipientID', $senderId);
        })->orderBy('SentAt', 'asc')->get();

        return response()->json(['messages' => $messages], 200);
    }

    public function checkConversation($userId1, $userId2)
    {
        $conversationExists = ChatMessage::where(function ($query) use ($userId1, $userId2) {
            $query->where('SenderID', $userId1)->where('RecipientID', $userId2);
        })->orWhere(function ($query) use ($userId1, $userId2) {
            $query->where('SenderID', $userId2)->where('RecipientID', $userId1);
        })->exists();
    
        return response()->json(['conversation_exists' => $conversationExists], 200);
    }
    

}
