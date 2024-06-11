<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TicketTask;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;

class TicketTaskController extends Controller
{
    public function index()
    {
        $tasks = TicketTask::with('assignee')->get();
        return response()->json($tasks, 200);
    }

    public function show($id)
    {
        $task = TicketTask::find($id);
        if (!$task) {
            return response()->json(['message' => 'Ticket task not found'], 404);
        }
        return response()->json($task, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'TicketID' => 'required|exists:tickets,TicketID',
            'CreatedBy' => 'required|exists:users,UserID',
            // Add other validation rules as needed
        ]);

        // Create the ticket task
        $task = new TicketTask();
        $task->fill($request->all());
        $task->CreatedOn = now(); // Set the CreatedOn field to the current datetime
        $task->save();

        // Find the ticket by its ID
        $ticket = Ticket::findOrFail($request->TicketID);

        if ($request->StatusCodeID != null) {
            $ticket->update([
                'StatusCodeID' => $request->StatusCodeID,
                'datedereparage' => now() // Utilisation de la fonction now() de Laravel pour obtenir la date et l'heure actuelles
            ]);
        }else{
            // Mettre à jour le StatusCodeID
            $ticket->update([
                'StatusCodeID' => 'en_cours'
            ]);

        }

        // Return the created task along with the updated ticket
        return response()->json(['task' => $task, 'ticket' => $ticket], 201);
    }

    public function update(Request $request, $id)
    {
        $task = TicketTask::find($id);
        if (!$task) {
            return response()->json(['message' => 'Ticket task not found'], 404);
        }

        $request->validate([
            'TicketID' => 'exists:tickets,TicketID',
            'CreatedBy' => 'exists:users,UserID',
            'StatusCodeID' => 'exists:ticket_status,StatusCodeID',
            'PriorityID' => 'exists:priorities,PriorityID',
            // Ajoutez d'autres règles de validation au besoin
        ]);

        $task->update($request->all());
        return response()->json($task, 200);
    }

    public function destroy($id)
    {
        $task = TicketTask::find($id);
        if (!$task) {
            return response()->json(['message' => 'Ticket task not found'], 404);
        }

        $task->delete();
        return response()->json(null, 204);
    }

    public function tasksByUser($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }

        $tasks = TicketTask::where('AssigneeID', $userId)
            ->orderBy('StartDate', 'ASC')
            ->get();

        return response()->json($tasks);
    }


    public function getFutureTasks($assigneeID)
    {
        $today = Carbon::today();

        // Récupérer les tâches futures pour l'utilisateur spécifié
        $tasks = TicketTask::where('AssigneeID', $assigneeID)
            ->where('StartDate', '>', $today)
            ->get();

        return response()->json($tasks);
    }
}
