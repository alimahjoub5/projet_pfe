<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TicketStatus;

class TicketStatusController extends Controller
{
    public function index()
    {
        $statuses = TicketStatus::all();
        return response()->json($statuses, 200);
    }

    public function show($id)
    {
        $status = TicketStatus::find($id);
        if (!$status) {
            return response()->json(['message' => 'Ticket status not found'], 404);
        }
        return response()->json($status, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'StatusName' => 'required|string',
            // Ajoutez d'autres règles de validation au besoin
        ]);

        $status = TicketStatus::create($request->all());
        return response()->json($status, 201);
    }

    public function update(Request $request, $id)
    {
        $status = TicketStatus::find($id);
        if (!$status) {
            return response()->json(['message' => 'Ticket status not found'], 404);
        }

        $request->validate([
            'StatusName' => 'required|string',
            // Ajoutez d'autres règles de validation au besoin
        ]);

        $status->update($request->all());
        return response()->json($status, 200);
    }

    public function destroy($id)
    {
        $status = TicketStatus::find($id);
        if (!$status) {
            return response()->json(['message' => 'Ticket status not found'], 404);
        }

        $status->delete();
        return response()->json(null, 204);
    }
}
