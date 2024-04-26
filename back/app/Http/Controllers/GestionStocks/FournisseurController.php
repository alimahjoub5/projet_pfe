<?php

namespace App\Http\Controllers\GestionStocks;

use Illuminate\Http\Request;
use App\Models\Fournisseur;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class FournisseurController extends Controller
{
    public function index()
    {
        $fournisseurs = Fournisseur::all();
        return response()->json(['fournisseurs' => $fournisseurs], 200);
    }

    public function show($id)
    {
        $fournisseur = Fournisseur::find($id);
        if (!$fournisseur) {
            return response()->json(['message' => 'Fournisseur not found'], 404);
        }
        return response()->json(['fournisseur' => $fournisseur], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom_fournisseur' => 'required|string',
            'adresse' => 'required|string',
            'email' => 'required|email',
            'telephone' => 'required|string',
            // Ajoutez les autres règles de validation ici
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $fournisseur = Fournisseur::create($request->all());
        return response()->json(['fournisseur' => $fournisseur], 201);
    }

    public function update(Request $request, $id)
    {
        $fournisseur = Fournisseur::find($id);
        if (!$fournisseur) {
            return response()->json(['message' => 'Fournisseur not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom_fournisseur' => 'string',
            'adresse' => 'string',
            'email' => 'email',
            'telephone' => 'string',
            // Ajoutez les autres règles de validation ici
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $fournisseur->update($request->all());
        return response()->json(['fournisseur' => $fournisseur], 200);
    }

    public function destroy($id)
    {
        $fournisseur = Fournisseur::find($id);
        if (!$fournisseur) {
            return response()->json(['message' => 'Fournisseur not found'], 404);
        }

        $fournisseur->delete();
        return response()->json(['message' => 'Fournisseur deleted successfully'], 200);
    }


    public function getFournisseursByPiece($pieceId)
    {
        // Récupérer la pièce avec ses fournisseurs
        $piece = Piece::with('fournisseurs')->find($pieceId);

        if (!$piece) {
            return response()->json(['error' => 'Pièce non trouvée'], 404);
        }

        // Renvoyer la liste des fournisseurs associés à cette pièce
        return response()->json($piece->fournisseurs);
    }

}
