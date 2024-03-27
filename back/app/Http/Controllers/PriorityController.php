<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Priority;

class PriorityController extends Controller
{
    public function index()
    {
        $priorities = Priority::all();
        return response()->json($priorities, 200);
    }

    public function show($id)
    {
        $priority = Priority::find($id);
        if (!$priority) {
            return response()->json(['message' => 'Priority not found'], 404);
        }
        return response()->json($priority, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'Name' => 'required|string|unique:priorities,Name',
            // Ajoutez d'autres règles de validation au besoin
        ]);

        $priority = Priority::create($request->all());
        return response()->json($priority, 201);
    }

    public function update(Request $request, $id)
    {
        $priority = Priority::find($id);
        if (!$priority) {
            return response()->json(['message' => 'Priority not found'], 404);
        }

        $request->validate([
            'Name' => 'required|string|unique:priorities,Name,'. $priority->PriorityID.',PriorityID',
            // Ajoutez d'autres règles de validation au besoin
        ]);

        $priority->update($request->all());
        return response()->json($priority, 200);
    }

    public function destroy($id)
    {
        $priority = Priority::find($id);
        if (!$priority) {
            return response()->json(['message' => 'Priority not found'], 404);
        }

        $priority->delete();
        return response()->json(null, 204);
    }


//------------------------------------------------------------------------------

public function getPriorityName($id) {
    $priority = Priority::find($id);
    if ($priority !== null) {
        return response()->json($priority->Name, 200);
    } else {
        return response()->json(['error' => 'Priority not found'], 404);
    }
}

}
