<?php

namespace App\Http\Controllers\GestionStocks;

use App\Models\CommandeEnAttente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\Fournisseur;
use App\Models\Piece;
use App\Mail\CommandeNotification;
use Illuminate\Support\Facades\Mail;

use Dompdf\Dompdf;
use Dompdf\Options;

class CommandeEnAttenteController extends Controller
{
    public function index()
    {
        $commandes = CommandeEnAttente::with('fournisseur','piece')->get();
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
            'fournisseur_id' => 'required',
            'expected_delivery_date' => 'nullable|date',
        ]);
    
        // Envoyer un e-mail au fournisseur
        $fournisseur = Fournisseur::find($request->fournisseur_id);
        
        // Récupérer les détails de la pièce
        $piece = Piece::find($request->piece_id);
        
        $details = [
            'nom_piece' => $piece->nom_piece,
            'date_livraison_prevue' => $request->expected_delivery_date,
            'total_commande' => $request->requested_quantity * $piece->cost,
            // Ajoutez d'autres détails ici si nécessaire
        ];
        
        Mail::to($fournisseur->email)->send(new CommandeNotification($details));
    
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
