<?php

namespace App\Http\Controllers\GestionStocks;

use Illuminate\Http\Request;
use App\Models\UtilisationPiece;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class UtilisationPiecesController extends Controller
{

    public function index()
    {
        $stockPieces = UtilisationPiece::with('piece','equipment')->get();
        return response()->json($stockPieces);
    }
    

      // Méthode pour créer une nouvelle utilisation de pièce
      public function store(Request $request)
      {
          $utilisation = new UtilisationPiece();
          $utilisation->utilisation_id = $request->input('utilisation_id');
          $utilisation->EquipmentTypeID = $request->input('EquipmentTypeID');
          $utilisation->piece_id = $request->input('piece_id');
          $utilisation->quantity_used = $request->input('quantity_used');
          $utilisation->date_utilisation = $request->input('date_utilisation');
          $utilisation->description = $request->input('description');
          $utilisation->save();
  
          return response()->json(['message' => 'Utilisation de pièce créée avec succès'], 201);
      }
  
      // Méthode pour mettre à jour une utilisation de pièce existante
      public function update(Request $request, $id)
      {
          $utilisation = UtilisationPiece::find($id);
          if (!$utilisation) {
              return response()->json(['message' => 'Utilisation de pièce non trouvée'], 404);
          }
  
          $utilisation->utilisation_id = $request->input('utilisation_id');
          $utilisation->EquipmentTypeID = $request->input('EquipmentTypeID');
          $utilisation->piece_id = $request->input('piece_id');
          $utilisation->quantity_used = $request->input('quantity_used');
          $utilisation->date_utilisation = $request->input('date_utilisation');
          $utilisation->description = $request->input('description');
          $utilisation->save();
  
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
  
  
      // Méthode pour récupérer une utilisation de pièce spécifique par son ID
      public function show($id)
      {
          $utilisation = UtilisationPiece::find($id);
          if (!$utilisation) {
              return response()->json(['message' => 'Utilisation de pièce non trouvée'], 404);
          }
  
          return response()->json($utilisation, 200);
      }
}
