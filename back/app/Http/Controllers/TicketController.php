<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ticket;
class TicketController extends Controller
{
    public function getTicket(){
        return response ()->json(Ticket::all(),200);
    }
    public function getTicketById(){
        $ticket = Ticket::find($id);
        if(is_null($ticket)){
        return response()->json(['message'=> 'Ticket not found'],404);
    }
        return response()->json($ticket::find($id),200);
    }
    public function addTicket(Request $request){
        $ticket= Ticket::create($request->all());
        return response($ticket,201);
    }
    public function updateTicket(Request $request){
       $ticket = Ticket::find($id);
       if(is_null($ticket)){
        return response()->json(['message'=> 'Ticket not found'],404);
       } 
       $ticket = update($request->all());
       return response($ticket,201);

    }
    public function deleteTicket(Request $request){
        $ticket= Ticket::find($id);
        if(is_null($ticket)){
            return response()->json(['message'=> 'Ticket not found'],404);
           } 
           $ticket->delete();
           return response()->json(null,204);
    }
}
