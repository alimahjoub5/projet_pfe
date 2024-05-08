<?php

namespace App\Http\Controllers\GestionStocks;

use Illuminate\Http\Request;
use App\Models\UtilisationPiece;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\StockPiece;

class UtilisationPiecesController extends Controller
{

    public function index()
    {
        $stockPieces = UtilisationPiece::with('piece', 'equipment')->get();
        return response()->json($stockPieces);
    }

      // Méthode pour créer une nouvelle utilisation de pièce
      public function store(Request $request)
      {
          // Valider les données de la requête
          $request->validate([
              'EquipmentTypeID' => 'required',
              'piece_id' => 'required',
              'quantity_used' => 'required|numeric|min:1',
              // Ajoutez d'autres règles de validation si nécessaire
          ]);
  
          // Créer une instance de UtilisationPiece
          $utilisation = new UtilisationPiece();
          $utilisation->EquipmentTypeID = $request->input('EquipmentTypeID');
          $utilisation->piece_id = $request->input('piece_id');
          $utilisation->quantity_used = $request->input('quantity_used');
          $utilisation->date_utilisation = now();
          $utilisation->description = $request->input('description');
  
          // Enregistrer l'utilisation de la pièce
          $utilisation->save();
  
          // Mettre à jour le stock de pièces
          $stockPiece = StockPiece::where('piece_id', $request->input('piece_id'))->firstOrFail();
          $reservedQuantity = $stockPiece->reserved_quantity + $request->input('quantity_used');
          $stockPiece->reserved_quantity = $reservedQuantity;
          $stockPiece->quantity -= $request->input('quantity_used');
          $stockPiece->save();
  
          return response()->json(['message' => 'Utilisation de pièce créée avec succès'], 201);
      }
  
      // Méthode pour mettre à jour une utilisation de pièce existante
      public function update(Request $request, $id)
      {
          // Valider les données de la requête
          $request->validate([
              'EquipmentTypeID' => 'required',
              'piece_id' => 'required',
              'quantity_used' => 'required|numeric|min:1',
              'date_utilisation' => 'required|date',
              // Ajoutez d'autres règles de validation si nécessaire
          ]);
      
          // Rechercher l'utilisation de pièce à mettre à jour
          $utilisation = UtilisationPiece::find($id);
          if (!$utilisation) {
              return response()->json(['message' => 'Utilisation de pièce non trouvée'], 404);
          }
      
          // Calculer la différence de quantité utilisée pour la mise à jour du stock
          $oldQuantityUsed = $utilisation->quantity_used;
          $newQuantityUsed = $request->input('quantity_used');
          $quantityDifference = $newQuantityUsed - $oldQuantityUsed;
      
          // Vérifier si la quantité disponible dans le stock est suffisante
          $stockPiece = StockPiece::where('piece_id', $request->input('piece_id'))->firstOrFail();
          $availableQuantity = $stockPiece->quantity;
          if ($quantityDifference > $availableQuantity) {
              return response()->json(['message' => 'La quantité disponible dans le stock est insuffisante'], 422);
          }
      
          // Mettre à jour l'utilisation de pièce
          $utilisation->EquipmentTypeID = $request->input('EquipmentTypeID');
          $utilisation->piece_id = $request->input('piece_id');
          $utilisation->quantity_used = $newQuantityUsed;
          $utilisation->date_utilisation = $request->input('date_utilisation');
          $utilisation->description = $request->input('description');
          $utilisation->save();
      
          // Mettre à jour le stock de pièces
          $stockPiece->reserved_quantity += $quantityDifference;
          $stockPiece->quantity -= $quantityDifference;
          $stockPiece->save();
      
          return response()->json(['message' => 'Utilisation de pièce mise à jour avec succès'], 200);
      }
      
  
      // Méthode pour supprimer une utilisation de pièce
      public function destroy($id)
      {
          $utilisation = UtilisationPiece::find($id);
          if (!$utilisation) {
              return response()->json(['message' => 'Utilisation de pièce non trouvée'], 404);
          }
  
          $utilisation->delete();
  
          return response()->json(['message' => 'Utilisation de pièce supprimée avec succès'], 200);
      }
  
    public function show($id)
    {
        $utilisation = UtilisationPiece::find($id);
        if (!$utilisation) {
            return response()->json(['message' => 'Utilisation de pièce non trouvée'], 404);
        }

        return response()->json($utilisation, 200);
    }
}
