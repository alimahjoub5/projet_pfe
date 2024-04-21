<?php

namespace App\Http\Controllers\GestionStocks;

use Illuminate\Http\Request;
use App\Models\Commande;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\Fournisseur;
use App\Mail\CommandeNotification;
use Illuminate\Support\Facades\Mail;

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
        // Valider les données du formulaire
        $validator = Validator::make($request->all(), [
            'nom_piece' => 'required|string',
            'date_livraison_prevue' => 'required|date',
            'date_livraison_effective' => 'nullable|date',
            'fournisseur_id' => 'required|exists:fournisseurs,fournisseur_id',
            'total_commande' => 'required|numeric',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
    
        // Remplir le champ date_commande avec la date actuelle côté serveur
        $request->merge(['date_commande' => now()]);
    
        // Enregistrer la commande dans la base de données
        $commande = Commande::create($validator->validated());
    
        // Envoyer un e-mail au fournisseur
        $fournisseur = Fournisseur::find($request->fournisseur_id);
    
        $details = [
            'nom_piece' => $request->nom_piece,
            'date_livraison_prevue' => $request->date_livraison_prevue,
            'total_commande' => $request->total_commande,
            // Ajoutez d'autres détails ici si nécessaire
        ];
    
        Mail::to($fournisseur->email)->send(new CommandeNotification($details));
    
        return response()->json(['message' => 'Commande enregistrée avec succès et notification envoyée au fournisseur.'], 200);
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
