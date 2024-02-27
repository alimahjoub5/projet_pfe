<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;

class TicketController extends Controller
{
    public function getTicket(){
        return response()->json(Ticket::all(), 200);
    }

    public function getTicketById($id){ // Ajouter $id en paramètre
        $ticket = Ticket::find($id);
        if(is_null($ticket)){
            return response()->json(['message'=> 'Ticket not found'], 404);
        }
        return response()->json($ticket, 200); // Correction ici pour retourner $ticket sans utiliser find()
    }

    public function addTicket(Request $request){
        $ticket = Ticket::create($request->all());
        return response()->json($ticket, 201);
    }

    public function updateTicket(Request $request, $id){ // Ajouter $id en paramètre
        $ticket = Ticket::find($id);
        if(is_null($ticket)){
            return response()->json(['message'=> 'Ticket not found'], 404);
        }
        $ticket->update($request->all()); // Correction ici pour utiliser la méthode update() sur $ticket
        return response()->json($ticket, 200);
    }

    public function deleteTicket($id){ // Ajouter $id en paramètre
        $ticket = Ticket::find($id);
        if(is_null($ticket)){
            return response()->json(['message'=> 'Ticket not found'], 404);
        }
        $ticket->delete();
        return response()->json(null, 204);
    }
}
