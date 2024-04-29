<?php

namespace App\Http\Controllers\GestionStocks;

use App\Models\CommandeEnAttente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class CommandeEnAttenteController extends Controller
{
    public function index()
    {
        $commandes = CommandeEnAttente::all();
        return response()->json($commandes, 200);
    }

    public function show($id)
    {
        $commande = CommandeEnAttente::find($id);
        if (!$commande) {
            return response()->json(['message' => 'Commande en attente non trouvée'], 404);
        }
        return response()->json($commande, 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'commande_id' => 'required',
            'piece_id' => 'required',
            'requested_quantity' => 'required',
            'order_date' => 'nullable|date',
            'order_status' => 'required|string',
            'fournisseur_id' => 'required',
            'expected_delivery_date' => 'nullable|date',
            'actual_delivery_date' => 'nullable|date',
        ]);

        $commande = CommandeEnAttente::create($validatedData);
        return response()->json($commande, 201);
    }

    public function update(Request $request, $id)
    {
        $commande = CommandeEnAttente::find($id);
        if (!$commande) {
            return response()->json(['message' => 'Commande en attente non trouvée'], 404);
        }

        $validatedData = $request->validate([
            'commande_id' => 'required',
            'piece_id' => 'required',
            'requested_quantity' => 'required',
            'order_date' => 'nullable|date',
            'order_status' => 'required|string',
            'fournisseur_id' => 'required',
            'expected_delivery_date' => 'nullable|date',
            'actual_delivery_date' => 'nullable|date',
        ]);

        $commande->update($validatedData);
        return response()->json($commande, 200);
    }

    public function destroy($id)
    {
        $commande = CommandeEnAttente::find($id);
        if (!$commande) {
            return response()->json(['message' => 'Commande en attente non trouvée'], 404);
        }

        $commande->delete();
        return response()->json(null, 204);
    }
}
