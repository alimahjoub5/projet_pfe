<?php

namespace App\Http\Controllers\GestionStocks;

use Illuminate\Http\Request;
use App\Models\CommandeEnAttente;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\Fournisseur;
use App\Mail\CommandeNotification;
use Illuminate\Support\Facades\Mail;

class CommandeEnAttenteController extends Controller
{
    public function index()
    {
        $commandes = CommandeEnAttente::all();
        return response()->json(['commandes' => $commandes], 200);
    }

    public function show($id)
    {
        $commande = CommandeEnAttente::find($id);
        if (!$commande) {
            return response()->json(['message' => 'Commande en attente introuvable'], 404);
        }
        return response()->json(['commande' => $commande], 200);
    }

    public function store(Request $request)
    {
        // Valider les données du formulaire
        $validator = Validator::make($request->all(), [
            'piece_id' => 'required|exists:pieces,id',
            'requested_quantity' => 'required|numeric',
            'order_date' => 'required|date',
            'order_status' => 'required|string',
            'fournisseur_id' => 'required|exists:fournisseurs,id',
            'expected_delivery_date' => 'nullable|date',
            'actual_delivery_date' => 'nullable|date',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
    
        // Enregistrer la commande en attente dans la base de données
        $commande = CommandeEnAttente::create($validator->validated());
    
        // Envoyer un e-mail au fournisseur
        $fournisseur = Fournisseur::find($request->fournisseur_id);
    
        $details = [
            'piece_id' => $request->piece_id,
            'requested_quantity' => $request->requested_quantity,
            'order_date' => $request->order_date,
            'order_status' => $request->order_status,
            // Ajoutez d'autres détails ici si nécessaire
        ];
    
        Mail::to($fournisseur->email)->send(new CommandeNotification($details));
    
        return response()->json(['message' => 'Commande en attente enregistrée avec succès et notification envoyée au fournisseur.'], 200);
    }
    
    public function update(Request $request, $id)
    {
        $commande = CommandeEnAttente::find($id);
        if (!$commande) {
            return response()->json(['message' => 'Commande en attente introuvable'], 404);
        }

        $validator = Validator::make($request->all(), [
            'piece_id' => 'exists:pieces,id',
            'requested_quantity' => 'numeric',
            'order_date' => 'date',
            'order_status' => 'string',
            'fournisseur_id' => 'exists:fournisseurs,id',
            'expected_delivery_date' => 'nullable|date',
            'actual_delivery_date' => 'nullable|date',
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
        $commande = CommandeEnAttente::find($id);
        if (!$commande) {
            return response()->json(['message' => 'Commande en attente introuvable'], 404);
        }

        $commande->delete();
        return response()->json(['message' => 'Commande en attente supprimée avec succès'], 200);
    }
}
