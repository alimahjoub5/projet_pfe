<?php

namespace App\Http\Controllers\GestionStocks;

use Illuminate\Http\Request;
use App\Models\DetailCommande;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
class DetailCommandeController extends Controller
{
    public function index()
    {
        $detailsCommandes = DetailCommande::all();
        return response()->json(['detailsCommandes' => $detailsCommandes], 200);
    }

    public function show($id)
    {
        $detailCommande = DetailCommande::find($id);
        if (!$detailCommande) {
            return response()->json(['message' => 'DetailCommande not found'], 404);
        }
        return response()->json(['detailCommande' => $detailCommande], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'commande_id' => 'required|exists:commandes,commande_id',
            'stock_id' => 'required|exists:stocks,stock_id',
            'quantite_commandee' => 'required|integer',
            'quantite_recue' => 'required|integer',
            'prix_unitaire' => 'required|numeric',
            'montant_total' => 'required|numeric',
            // Ajoutez les autres règles de validation ici
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $detailCommande = DetailCommande::create($request->all());
        return response()->json(['detailCommande' => $detailCommande], 201);
    }

    public function update(Request $request, $id)
    {
        $detailCommande = DetailCommande::find($id);
        if (!$detailCommande) {
            return response()->json(['message' => 'DetailCommande not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'commande_id' => 'exists:commandes,commande_id',
            'stock_id' => 'exists:stocks,stock_id',
            'quantite_commandee' => 'integer',
            'quantite_recue' => 'integer',
            'prix_unitaire' => 'numeric',
            'montant_total' => 'numeric',
            // Ajoutez les autres règles de validation ici
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $detailCommande->update($request->all());
        return response()->json(['detailCommande' => $detailCommande], 200);
    }

    public function destroy($id)
    {
        $detailCommande = DetailCommande::find($id);
        if (!$detailCommande) {
            return response()->json(['message' => 'DetailCommande not found'], 404);
        }

        $detailCommande->delete();
        return response()->json(['message' => 'DetailCommande deleted successfully'], 200);
    }
}
