<?php

namespace App\Http\Controllers\GestionStocks;

use Illuminate\Http\Request;
use App\Models\Commande;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class CommandeController extends Controller
{
    public function index()
    {
        $commandes = Commande::all();
        return response()->json(['commandes' => $commandes], 200);
    }

    public function show($id)
    {
        $commande = Commande::find($id);
        if (!$commande) {
            return response()->json(['message' => 'Commande not found'], 404);
        }
        return response()->json(['commande' => $commande], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date_commande' => 'required|date',
            'date_livraison_prevue' => 'required|date',
            'statut' => 'required|string',
            'fournisseur_id' => 'required|exists:fournisseurs,fournisseur_id',
            'total_commande' => 'required|numeric',
            // Ajoutez les autres règles de validation ici
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $commande = Commande::create($request->all());
        return response()->json(['commande' => $commande], 201);
    }

    public function update(Request $request, $id)
    {
        $commande = Commande::find($id);
        if (!$commande) {
            return response()->json(['message' => 'Commande not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'date_commande' => 'date',
            'date_livraison_prevue' => 'date',
            'statut' => 'string',
            'fournisseur_id' => 'exists:fournisseurs,fournisseur_id',
            'total_commande' => 'numeric',
            // Ajoutez les autres règles de validation ici
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $commande->update($request->all());
        return response()->json(['commande' => $commande], 200);
    }

    public function destroy($id)
    {
        $commande = Commande::find($id);
        if (!$commande) {
            return response()->json(['message' => 'Commande not found'], 404);
        }

        $commande->delete();
        return response()->json(['message' => 'Commande deleted successfully'], 200);
    }
}
