<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TicketTask;

class TicketTaskController extends Controller
{
    public function index()
    {
        $tasks = TicketTask::all();
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
            'StatusCodeID' => 'required|exists:ticket_statuses,StatusCodeID',
            'PriorityID' => 'required|exists:priorities,PriorityID',
            // Ajoutez d'autres règles de validation au besoin
        ]);

        $task = TicketTask::create($request->all());
        return response()->json($task, 201);
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
            'StatusCodeID' => 'exists:ticket_statuses,StatusCodeID',
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
}
