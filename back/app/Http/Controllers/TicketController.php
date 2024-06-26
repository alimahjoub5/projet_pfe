<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\TechnicianAssignedToTicket;
use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\TechnicianGroup;
use App\Models\User;
use App\Models\Societe;
use App\Models\EquipmentType;
use App\Models\TicketDates;
use Carbon\Carbon;
use DB;
use App\Models\UsersTechnicianGroups;

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
                'datepriseencharge' => $ticket->datepriseencharge,
                'datedereparage' => $ticket->datedereparage,
                'datedevalidation' => $ticket->datedevalidation,
                'Subject' => $ticket->Subject,
                'SocieteID' => $ticket->SocieteID,
                'Description' => $ticket->Description,
                'PriorityID' => $ticket->PriorityID,
                'GroupID' => $ticket->GroupID,
                'EquipmentTypeID' => $ticket->EquipmentTypeID,
                'StartDate' => $ticket->StartDate,
                'EndDate' => $ticket->EndDate,
                'TicketType' => $ticket->TicketType,
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


    public function getUserTickets($userId)
    {
        // Fetch groups the user belongs to
        $userGroups = UsersTechnicianGroups::where('UserID', $userId)->pluck('GroupID')->toArray();

        // Fetch tickets where AssigneeID is the user or GroupID is in the user's groups
        $tickets = Ticket::with(['technicianGroup', 'priority', 'EquipmentType', 'users', 'Societe'])
            ->where('AssigneeID', $userId)
            ->orWhereIn('GroupID', $userGroups)
            ->get();

        // Map the tickets to include the group name, priority name, and equipment name
        $ticketsWithGroupNamePriorityAndEquipment = $tickets->map(function ($ticket) {
            return [
                'TicketID' => $ticket->TicketID,
                'CreatedBy' => $ticket->CreatedBy,
                'CreatedOn' => $ticket->CreatedOn,
                'ModifiedBy' => $ticket->ModifiedBy,
                'ModifiedOn' => $ticket->ModifiedOn,
                'StatusCodeID' => $ticket->StatusCodeID,
                'AssigneeID' => $ticket->AssigneeID,
                'datepriseencharge' => $ticket->datepriseencharge,
                'datedereparage' => $ticket->datedereparage,
                'datedevalidation' => $ticket->datedevalidation,
                'Subject' => $ticket->Subject,
                'SocieteID' => $ticket->SocieteID,
                'Description' => $ticket->Description,
                'PriorityID' => $ticket->PriorityID,
                'GroupID' => $ticket->GroupID,
                'EquipmentTypeID' => $ticket->EquipmentTypeID,
                'StartDate' => $ticket->StartDate,
                'EndDate' => $ticket->EndDate,
                'DueDate' => $ticket->DueDate,
                'TicketType' => $ticket->TicketType,
                'ClosedDate' => $ticket->ClosedDate,
                'name' => $ticket->Societe ? $ticket->Societe->name : 'Non assigné',
                'GroupName' => $ticket->technicianGroup ? $ticket->technicianGroup->GroupName : 'Non assigné',
                'PriorityName' => $ticket->priority ? $ticket->priority->Name : 'Non défini',
                'EquipmentTypeName' => $ticket->EquipmentType ? $ticket->EquipmentType->TypeName : 'Non défini',
                'username' => $ticket->users ? $ticket->users->Username : 'Non assigné'
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
    

    public function addTicket(Request $request)
    {
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
            'TicketID' => $request->input('TicketID')
        ];

        // Ensure that only one of AssigneeID, GroupID, or SocieteID is filled
        $filledFields = array_filter([
            'AssigneeID' => $ticketData['AssigneeID'],
            'GroupID' => $ticketData['GroupID'],
            'SocieteID' => $ticketData['SocieteID'],
        ]);

        if (count($filledFields) !== 1) {
            return response()->json(['error' => 'Please fill only one of AssigneeID, GroupID, or SocieteID'], 400);
        }

        // Create a new ticket with the extracted data
        $ticket = Ticket::create($ticketData);

        if (!empty($ticket->AssigneeID)) {
            // Fetch the technician details using the AssigneeID
            $technician = User::find($ticket->AssigneeID);

            if ($technician && !empty($technician->Email)) {
                // Send email to the technician
                Mail::send(new TechnicianAssignedToTicket($ticket, $technician));
            } else {
                // Handle case where technician email is not available or invalid
                return response()->json([
                    'message' => 'Ticket created, but email not sent. Technician email not found.'
                ], 201);
            }
        } elseif (!empty($ticket->GroupID)) {
            // Fetch all users in the group
            $groupMembers = UsersTechnicianGroups::where('GroupID', $ticket->GroupID)->get();

            foreach ($groupMembers as $member) {
                $technician = User::find($member->UserID);

                if ($technician && !empty($technician->Email)) {
                    // Send email to each technician in the group
                    Mail::send(new TechnicianAssignedToTicket($ticket, $technician));
                }
            }
        } elseif (!empty($ticket->SocieteID)) {
            // If you need to handle SocieteID specifically, implement logic here
        }

        // Return the created ticket as JSON response with status code 201
        return response()->json($ticket, 201);
    }


    public function updateTicket(Request $request, $id)
    {
        $ticket = Ticket::find($id);
    
        if(is_null($ticket)){
            return response()->json(['message'=> 'Ticket not found'], 404);
        }
    
        $ticket->fill($request->all()); // Use fill() method to update only fillable fields
        $ticket->save(); // Save the changes
    
        return response()->json($ticket, 200);
    }
    

    public function deleteTicket($id){ // Ajouter $id en paramètre
        $ticket = Ticket::find($id);
        if(is_null($ticket)){
            return response()->json(['message'=> 'Ticket not found'], 404);
        }
        // Mettre à jour le StatusCodeID
        $ticket->StatusCodeID = 'Annuler';

        // Sauvegarder les changements
        $ticket->save();
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


        public function getDate()
        {
            $ticketDates = TicketDates::all();
            return response()->json($ticketDates);
        }


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

        //------------------------------------------------------------------------------

        // Update datepriseencharge
        public function updateDatePriseEnCharge(Request $request, $id)
        {
            $request->validate([
                'datepriseencharge' => 'required|date',
            ]);
        
            $ticket = Ticket::findOrFail($id);
            $ticket->datepriseencharge = $request->datepriseencharge;
            $ticket->StatusCodeID = 'en_cours'; // Correction ici
        
            $ticket->save();
        
            return response()->json(['message' => 'Date prise en charge updated successfully'], 200);
        }
        

    // Update datedereparage and datedevalidation
    public function updateDates(Request $request, $id)
    {
        $request->validate([
            'datedereparage' => 'required|date',
            'datedevalidation' => 'required|date',
        ]);

        $ticket = Ticket::findOrFail($id);
        $ticket->datedereparage = $request->datedereparage;
        $ticket->datedevalidation = $request->datedevalidation;
        $ticket->save();

        return response()->json(['message' => 'Dates updated successfully'], 200);
    }

    public function closeTicket($id)
    {
        // Trouver le ticket par son ID
        $ticket = Ticket::find($id);
        
        if (!$ticket) {
            return response()->json(['error' => 'Ticket non trouvé'], 404);
        }
    
        // Mettre à jour les champs nécessaires avec la date et l'heure actuelles
        $currentDateTime = now(); // Obtenir la date et l'heure actuelles
    
        $ticket->datedevalidation = $currentDateTime;
        $ticket->StatusCodeID = 'cloture'; // Assuming 'cloture' is a valid status code
        $ticket->StatusValidation = true;
    
        // Sauvegarder les changements du ticket
        $ticket->save();
    
        // Mettre à jour la date de dernière maintenance de l'équipement associé
        if ($ticket->EquipmentTypeID) {
            $equipment = EquipmentType::find($ticket->EquipmentTypeID);
            if ($equipment) {
                $equipment->LastMaintenanceDate = $currentDateTime;
                $equipment->save();
            }
        }
    
        return response()->json(['message' => 'Ticket fermé avec succès', 'ticket' => $ticket]);
    }
    


    public function startTicket($id)
    {
        // Trouver le ticket par son ID
        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json(['error' => 'Ticket non trouvé'], 404);
        }

        // Mettre à jour le StatusCodeID
        $ticket->StatusCodeID = 'en_cours';

        // Sauvegarder les changements
        $ticket->save();

        return response()->json(['message' => 'Ticket mis à jour en cours', 'ticket' => $ticket]);
    }


    public function getTicketsByAssignee($assigneeId)
    {
        // Récupérer les tickets par AssigneeID
        $tickets = Ticket::where('AssigneeID', $assigneeId)->get(['TicketID', 'Subject', 'StartDate', 'ClosedDate']);

        return response()->json($tickets);
    }


    public function getUsersTasks()
    {
        // Récupérer tous les utilisateurs
        $users = User::all();
    
        $data = [];
    
        foreach ($users as $user) {
            // Tâches clôturées
            $completedTasks = Ticket::where('AssigneeID', $user->UserID)
                                    ->where('StatusCodeID', 'cloture') // Remplacez 'cloture' par l'ID ou le code correct du statut clôturé
                                    ->count();


            // Tâches non effectuées (en cours ou nouvelles)
            $pendingTasks = Ticket::where('AssigneeID', $user->UserID)
            ->whereIn('StatusCodeID', ['en cours', 'nouveau']) // Remplacez 'en cours' et 'nouveau' par les IDs ou les codes corrects des statuts
            ->count();


            // Tâches annulées
            $canceledTasks = Ticket::where('AssigneeID', $user->UserID)
                                   ->where('StatusCodeID', 'Annuler') // Remplacez 'annule' par l'ID ou le code correct du statut annulé
                                   ->count();
    
            // Tâches en cours
            $ongoingTasks = Ticket::where('AssigneeID', $user->UserID)
                                  ->where('StatusCodeID', 'en_cours') // Remplacez 'en cours' par l'ID ou le code correct du statut en cours
                                  ->count();
    
            $data[] = [
                'user' => $user,
                'completed_tasks' => $completedTasks,
                'pending_tasks' => $pendingTasks,
                'canceled_tasks' => $canceledTasks,
                'ongoing_tasks' => $ongoingTasks,
            ];
        }
    
        return response()->json($data);
    }
    


    public function getUserTasks($userId)
    {
        // Récupérer l'utilisateur par son identifiant
        $user = User::find($userId);

        // Vérifier si l'utilisateur existe et s'il est un technicien
        if (!$user || $user->Role !== 'Technician') {
            return response()->json(['error' => 'User not found or not a technician'], 404);
        }

        // Tâches clôturées
        $completedTasks = Ticket::where('AssigneeID', $user->UserID)
                                ->where('StatusCodeID', 'cloture') // Remplacez 'cloture' par l'ID ou le code correct du statut clôturé
                                ->count();

        // Tâches non effectuées (en cours ou nouvelles)
        $pendingTasks = Ticket::where('AssigneeID', $user->UserID)
                              ->whereIn('StatusCodeID', ['en cours', 'nouveau']) // Remplacez 'en cours' et 'nouveau' par les IDs ou les codes corrects des statuts
                              ->count();

                               // Tâches annulées
            $canceledTasks = Ticket::where('AssigneeID', $user->UserID)
            ->where('StatusCodeID', 'Annuler') // Remplacez 'annule' par l'ID ou le code correct du statut annulé
            ->count();

             // Tâches en cours
             $ongoingTasks = Ticket::where('AssigneeID', $user->UserID)
             ->where('StatusCodeID', 'en_cours') // Remplacez 'en cours' par l'ID ou le code correct du statut en cours
             ->count();

        $data = [
            'user' => $user,
            'completed_tasks' => $completedTasks,
            'pending_tasks' => $pendingTasks,
            'canceled_tasks' => $canceledTasks,
            'ongoing_tasks' => $ongoingTasks,
        ];

        return response()->json($data);
    }


    public function getUnplannedDowntime()
    {
        // Récupérer tous les tickets
        $tickets = Ticket::all();

        $unplannedDowntime = 0;

        foreach ($tickets as $ticket) {
            // Vérifier si le ticket a un temps d'arrêt non planifié
            if ($ticket->StartDate && $ticket->datedevalidation) {
                $startTime = Carbon::parse($ticket->StartDate);
                $endTime = Carbon::parse($ticket->datedevalidation);
                $unplannedDowntime += $endTime->diffInMinutes($startTime);
            }
        }

        return response()->json([
            'unplanned_downtime' => $unplannedDowntime
        ]);
    }


    public function getFailuresByPeriod(Request $request)
    {
        $startDate = Carbon::parse($request->input('start_date'))->startOfDay()->toDateString();
        $endDate = Carbon::parse($request->input('end_date'))->endOfDay()->toDateString();

        $failures = Ticket::whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->get();

        return response()->json($failures);
    }

}