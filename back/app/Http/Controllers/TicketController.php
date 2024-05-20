<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\TechnicianGroup;
use App\Models\User;
use App\Models\Societe;
use App\Models\TicketDates;

class TicketController extends Controller
{
    public function getTicket()
    {
        $tickets = Ticket::with(['technicianGroup', 'priority', 'EquipmentType', 'users','Societe'])->get();
    
        // Mapper les tickets pour inclure le nom du groupe, le nom de la priorité et le nom de l'équipement
        $ticketsWithGroupNamePriorityAndEquipment = $tickets->map(function ($ticket) {
            return [
                'TicketID' => $ticket->TicketID,
                'CreatedBy' => $ticket->CreatedBy,
                'CreatedOn' => $ticket->CreatedOn,
                'ModifiedBy' => $ticket->ModifiedBy,
                'ModifiedOn' => $ticket->ModifiedOn,
                'StatusCodeID' => $ticket->StatusCodeID,
                'AssigneeID' => $ticket->AssigneeID,
                'Subject' => $ticket->Subject,
                'SocieteID' => $ticket->SocieteID,
                'Description' => $ticket->Description,
                'PriorityID' => $ticket->PriorityID,
                'GroupID' => $ticket->GroupID,
                'EquipmentTypeID' => $ticket->EquipmentTypeID,
                'StartDate' => $ticket->StartDate,
                'EndDate' => $ticket->EndDate,
                'DueDate' => $ticket->DueDate,
                'ClosedDate' => $ticket->ClosedDate,
                'name' => $ticket->Societe ? $ticket->Societe->name : 'Non assigné',
                'GroupName' => $ticket->technicianGroup ? $ticket->technicianGroup->GroupName : 'Non assigné',
                'PriorityName' => $ticket->priority ? $ticket->priority->Name : 'Non défini',
                'EquipmentTypeName' => $ticket->EquipmentType ? $ticket->EquipmentType->TypeName : 'Non défini', // Ajouter le nom de l'équipement ou 'Non défini' s'il n'y a pas d'équipement assigné
                'username' => $ticket->users ? $ticket->users->Username : 'Non assigné' // Ajouter le nom de l'utilisateur ou 'Non défini' s'il n'y a pas d'utilisateur assigné
            ];
        });
    
        return response()->json($ticketsWithGroupNamePriorityAndEquipment, 200);
    }
    
    
        
    
    


    public function getTicketById($id){ // Ajouter $id en paramètre
        $ticket = Ticket::find($id);
        if(is_null($ticket)){
            return response()->json(['message'=> 'Ticket not found'], 404);
        }
        return response()->json($ticket, 200); // Correction ici pour retourner $ticket sans utiliser find()
    }
    
    
    public function getLastId()
    {
        $lastId = Ticket::latest('TicketID')->value('TicketID');
        return response()->json([$lastId]);
    }
    

    public function addTicket(Request $request){
        // Extracting the required fields from the request
        $ticketData = [

            'Subject' => $request->input('Subject'),
            'Description' => $request->input('Description'),
            'TicketType' => $request->input('TicketType'),
            'AssigneeID' => $request->input('AssigneeID'),
            'SocieteID' => $request->input('SocieteID'),
            'GroupID' => $request->input('GroupID'),
            'PriorityID' => $request->input('PriorityID'),
            'EquipmentTypeID' => $request->input('EquipmentTypeID'),
            'CreatedBy' => $request->input('CreatedBy'),
            'ModifiedBy' => $request->input('ModifiedBy'),
            'StatusCodeID' => $request->input('StatusCodeID'),
            'TicketID' =>$request->input('TicketID')
        ];
        $data=['TicketID' =>$request->input('TicketID'),
        'datedemande' =>null,
        'datepriseencharge'=>null,
        'datedereparage'=>null,
        'datedevalidation'=>null,
    ];
        // Create a new ticket with the extracted data
        $ticket = Ticket::create($ticketData);
        $date = TicketDates::create($data);
        // Return the created ticket as JSON response with status code 201
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

    public function getTicketName($ticketID) {
        $ticket = Ticket::find($ticketID);
        
        if ($ticket) {
            return response()->json(['subject' => $ticket->Subject], 200);
        } else {
            return response()->json(['error' => 'Ticket not found'], 404);
        }
    }

    public function assignTicketToGroup(Request $request, $ticketId)
    {
        // Validation des données de la requête
        $request->validate([
            'group_id' => 'required|exists:technician_groups,GroupID'
        ]);
    
        // Recherche du ticket
        $ticket = Ticket::findOrFail($ticketId);
    
        // Recherche du groupe
        $group = TechnicianGroup::findOrFail($request->group_id);
    
        // Attribution du groupe au ticket
        $ticket->update(['GroupID' => $group->GroupID]);
    
        // Vérifier si la mise à jour a réussi
        if ($ticket->wasChanged()) {
            // Réponse JSON si la mise à jour a réussi
            return response()->json(['message' => 'Ticket assigned to group successfully'], 200);
        } else {
            // Réponse JSON si la mise à jour a échoué
            return response()->json(['message' => 'Failed to assign ticket to group'], 500);
        }
    }
    
        public function assignTicketToSociete(Request $request, $ticketId)
        {
            // Validation des données de la requête
            $request->validate([
                'SocieteID' => 'required|exists:societe,SocieteID'
            ]);
    
            try {
// Recherche du ticket
$ticket = Ticket::findOrFail($ticketId);
if (!$ticket) {
    return response()->json(['message' => 'Ticket not found'], 404);
}

// Recherche du groupe
$soc = Societe::findOrFail($request->SocieteID);
if (!$soc) {
    return response()->json(['message' => 'Societe not found'], 404);
}

// Attribution du groupe au ticket
$ticket->update(['SocieteID' => $soc->SocieteID]);
if (!$ticket->wasChanged()) {
    return response()->json(['message' => 'Failed to assign ticket to societe'], 500);
}

// Réponse JSON si la mise à jour a réussi
return response()->json(['message' => 'Ticket assigned to societe successfully'], 200);

} catch (\Exception $e) {
                // Réponse JSON si une erreur se produit
                return response()->json(['message' => 'Failed to assign ticket to societe', 'error' => $e->getMessage()], 500);
            }
        }


        //----------------------------------------------------------------------------------------------


        public function update($request, $id)
        {
            $request->validate([
                'TicketID' => 'required|exists:tickets,TicketID',
                'datedemande' => 'required|date',
                'datepriseencharge' => 'nullable|date',
                'datedereparage' => 'nullable|date',
                'datedevalidation' => 'nullable|date',
            ]);
        
            $date = TicketDates::where('TicketID', $id)->firstOrFail();
            $date->update($request->all());
        
        }





}