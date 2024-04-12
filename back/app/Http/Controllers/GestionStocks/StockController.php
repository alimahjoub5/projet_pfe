<?php

namespace App\Http\Controllers\GestionStocks;

use Illuminate\Http\Request;
use App\Models\Stock;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class StockController extends Controller
{
    public function index()
    {
        $stocks = Stock::all();
    
        // Créez un tableau pour stocker les données modifiées
        $formattedStocks = [];
    
        // Parcourez chaque stock pour ajouter le chemin de l'image
        foreach ($stocks as $stock) {
            // Construisez le chemin complet de l'image en fonction du nom de l'image et de l'emplacement de stockage
            $imagePath = asset('images/stocks/' . $stock->image_piece);
    
            // Créez un nouvel objet contenant toutes les données du stock avec le chemin de l'image ajouté
            $formattedStock = [
                'id' => $stock->id,
                'nom_piece' => $stock->nom_piece,
                'image_piece' => $imagePath, // Ajoutez le chemin de l'image
                'quantite' => $stock->quantite,
                'quantite_reservee' => $stock->quantite_reservee,
                'seuil_min' => $stock->seuil_min,
                'seuil_max' => $stock->seuil_max,
                'fournisseur_id' => $stock->fournisseur_id,
                'created_at' => $stock->created_at,
                'created_by' => $stock->created_by,
                'modify_at' => $stock->modify_at,
                'modify_by' => $stock->modify_by,
            ];
    
            // Ajoutez le stock formaté au tableau
            $formattedStocks[] = $formattedStock;
        }
    
        // Retournez la réponse JSON contenant les stocks formatés avec les chemins d'image
        return response()->json(['stocks' => $formattedStocks], 200);
    }
    

    public function show($id)
    {
        $stock = Stock::find($id);
        if (!$stock) {
            return response()->json(['message' => 'Stock not found'], 404);
        }
        return response()->json(['stock' => $stock], 200);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom_piece' => 'required|string',
            'description' => 'required|string', // Ajoutez la validation pour le champ description
            'quantite' => 'required|integer',
            'image_piece' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'quantite_reservee' => 'required|integer',
            'seuil_min' => 'required|integer',
            'seuil_max' => 'required|integer',
            'fournisseur_id' => 'required|integer',
            // Ajoutez les autres règles de validation ici
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
    
        // Traitement de l'image
        $getImage = $request->file('image_piece');
        $imageName = $request->nom_piece . '_' . time() . '.' . $getImage->getClientOriginalExtension();
        $imagePath = public_path().'/images/stocks';
    
        $getImage->move($imagePath, $imageName);
    
        // Création du stock avec les données du formulaire
        $stock = Stock::create([
            'nom_piece' => $request->nom_piece,
            'description' => $request->description,
            'image_piece' => $imageName,
            'quantite' => $request->quantite,
            'quantite_reservee' => $request->quantite_reservee,
            'seuil_min' => $request->seuil_min,
            'seuil_max' => $request->seuil_max,
            'fournisseur_id' => $request->fournisseur_id,
            // Ajoutez les autres champs ici
        ]);
    
        return response()->json([
            "success" => true,
            "message" => "Stock créé avec succès",
            "data" => $stock
        ], 201);
    }
    
    
    
    
    

    public function update(Request $request, $id)
    {
        $stock = Stock::find($id);
        if (!$stock) {
            return response()->json(['message' => 'Stock not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom_piece' => 'string',
            'quantite' => 'integer',
            // Ajoutez les autres règles de validation ici
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $stock->update($request->all());
        return response()->json(['stock' => $stock], 200);
    }

    public function destroy($id)
    {
        $stock = Stock::find($id);
        if (!$stock) {
            return response()->json(['message' => 'Stock not found'], 404);
        }

        $stock->delete();
        return response()->json(['message' => 'Stock deleted successfully'], 200);
    }
}
