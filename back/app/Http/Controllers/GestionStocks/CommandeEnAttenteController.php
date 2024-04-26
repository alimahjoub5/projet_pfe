<?php

namespace App\Http\Controllers\GestionStocks;

use App\Models\CommandeEnAttente; // Nom de la classe corrigé
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class CommandeEnAttenteController extends Controller // Nom de la classe corrigé
{
    public function index()
    {
        $commandes = CommandeEnAttente::all(); // Nom de la classe corrigé
        return response()->json($commandes, 200);
    }

    public function show($id )
    { 
       
        return response()->json($commandes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'commande_id' => 'required',
            'piece_id' => 'required',
            'requested_quantity' => 'required',
            'order_date' => 'nullable|date',
            'order_status' => 'required|string',
            'fournisseur_id' => 'required',
            'expected_delivery_date' => 'nullable|date',
            'actual_delivery_date' => 'nullable|date',
        ]);

        $commandes = CommandeEnAttente::create($request->all()); // Nom de la classe corrigé
        return response()->json($commandes, 201);
    }

    public function update(Request $request, $id)
    {
        $commandes = CommandeEnAttente::find($id); // Nom de la classe corrigé
        if (!$commandes) {
            return response()->json(['message' => 'Commande en attente non trouvée'], 404);
        }

        $request->validate([
            'commande_id' => 'required',
            'piece_id' => 'required',
            'requested_quantity' => 'required',
            'order_date' => 'nullable|date',
            'order_status' => 'required|string',
            'fournisseur_id' => 'required',
            'expected_delivery_date' => 'nullable|date',
            'actual_delivery_date' => 'nullable|date',
        ]);

        $commandes->update($request->all());
        return response()->json($commandes, 200);
    }

    public function destroy($id)
    {
        $commandes = CommandeEnAttente::find($id); // Nom de la classe corrigé
        if (!$commandes) {
            return response()->json(['message' => 'Commande en attente non trouvée'], 404);
        }

        $commandes->delete();
        return response()->json(null, 204);
    }
}
