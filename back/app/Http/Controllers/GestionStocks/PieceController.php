<?php

namespace App\Http\Controllers\GestionStocks;

use App\Models\Piece;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class PieceController extends Controller
{
    // Méthode pour afficher toutes les pièces
    public function index()
    {
        // Récupérer toutes les pièces
        $pieces = Piece::with('fournisseurs')->get();    
        // Parcourir toutes les pièces et modifier l'URL de l'image
        foreach ($pieces as $piece) {
            // Modifier l'URL de l'image pour chaque pièce
            $piece->image_url = asset('images/piece/' . $piece->image_piece);
        }
    
        // Retourner les pièces avec les URLs des images modifiées
        return response()->json(['pieces' => $pieces], 200);
    }
    

 // Méthode pour créer une nouvelle pièce avec upload d'image
 public function store(Request $request)
 {
     // Valider les données du formulaire
     $validator = Validator::make($request->all(), [
         'nom_piece' => 'required|string',
         'description' => 'nullable|string',
         'image_piece' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Maximum 2MB
         'material' => 'nullable|string',
         'serial_number' => 'nullable|string',
         'fabrication_date' => 'nullable|date',
         'expiration_date' => 'nullable|date',
         'cost' => 'nullable|numeric',
         'fournisseur_id' => 'nullable|exists:fournisseurs,fournisseur_id',
     ]);

     if ($validator->fails()) {
         return response()->json(['error' => $validator->errors()], 422);
     }

     // Upload de l'image
     $image = $request->file('image_piece');
     $imageName = time().'.'.$image->extension();
     $image->move(public_path('images/piece'), $imageName);

     // Créer la pièce dans la base de données
     $piece = new Piece([
         'nom_piece' => $request->nom_piece,
         'description' => $request->description,
         'image_piece' => $imageName,
         'material' => $request->material,
         'serial_number' => $request->serial_number,
         'fabrication_date' => $request->fabrication_date,
         'expiration_date' => $request->expiration_date,
         'cost' => $request->cost,
         'fournisseur_id' => $request->fournisseur_id,
     ]);
     $piece->save();

     // Retourner une réponse avec la pièce créée
     return response()->json($piece, 201);
 }


    // Méthode pour afficher une seule pièce
    public function show($id)
    {
        $piece = Piece::findOrFail($id);
        return response()->json($piece);
    }

    // Méthode pour mettre à jour une pièce
    public function update(Request $request, $id)
    {
        // Valider les données du formulaire
        $validator = Validator::make($request->all(), [
            'nom_piece' => 'required|string',
            'description' => 'nullable|string',
            'material' => 'nullable|string',
            'serial_number' => 'nullable|string',
            'fabrication_date' => 'nullable|date',
            'expiration_date' => 'nullable|date',
            'cost' => 'nullable|numeric',
            'fournisseur_id' => 'nullable|exists:fournisseurs,fournisseur_id',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
    
        // Trouver la pièce à mettre à jour
        $piece = Piece::findOrFail($id);
    
        // Mettre à jour les champs de la pièce
        $piece->nom_piece = $request->nom_piece;
        $piece->description = $request->description;
        $piece->material = $request->material;
        $piece->serial_number = $request->serial_number;
        $piece->fabrication_date = $request->fabrication_date;
        $piece->expiration_date = $request->expiration_date;
        $piece->cost = $request->cost;
        $piece->fournisseur_id = $request->fournisseur_id;
    
        // Sauvegarder les modifications
        $piece->save();
    
        // Retourner une réponse avec la pièce mise à jour
        return response()->json($piece, 200);
    }

// Méthode pour supprimer une pièce
public function destroy($id)
{
    $piece = Piece::findOrFail($id);

    $imagePath = public_path('images/piece/' . $piece->image_piece);
    if (file_exists($imagePath)) {
        unlink($imagePath);
    }
    $piece->delete();

    return response()->json(null, 204);
}

}
