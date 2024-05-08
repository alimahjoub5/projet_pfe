<?php

namespace App\Http\Controllers\GestionStocks;

use App\Models\CommandeEnAttente;
use Illuminate\Http\Request;
use App\Models\CommandeEnAttente;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\Fournisseur;
use App\Models\Piece;
use App\Models\StockPiece;
use App\Mail\CommandeNotification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Facades\URL;
use App\Mail\CommandeNotification;
use Illuminate\Support\Facades\Mail;

class CommandeEnAttenteController extends Controller
{

    public function index()
    {
        // Retrieve all CommandeEnAttente instances
        $commandes = CommandeEnAttente::all();
    
        // Iterate through each CommandeEnAttente instance
        foreach ($commandes as $commande) {
            // Retrieve the associated Fournisseur for the CommandeEnAttente instance
            $fournisseur = $commande->fournisseur;
    
            // Retrieve the associated Piece for the CommandeEnAttente instance
            $piece = $commande->piece;
    
            // Retrieve the associated StockPiece for the Piece
            $stockPiece = $piece->stockPiece;
    
            // Add the PDF link to the CommandeEnAttente instance
            $pdfPath = '';
            if ($commande->facture_url) {
                $pdfPath = asset("api/".$commande->facture_url);
            }
            $commande->pdf_link = $pdfPath;
    
            // Add the Fournisseur, Piece, and StockPiece to the CommandeEnAttente instance
            $commande->fournisseur = $fournisseur;
            $commande->piece = $piece;
            $commande->stock_piece = $stockPiece;
        }
    
        // Return the CommandeEnAttente instances as JSON response
        return response()->json($commandes, 200);
        $commandes = CommandeEnAttente::all();
        return response()->json(['commandes' => $commandes], 200);
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
    
            // Fetch supplier details
            $fournisseur = Fournisseur::findOrFail($request->fournisseur_id);
    
            // Fetch piece details
            $piece = Piece::findOrFail($request->piece_id);
    
            // Calculate total cost
            $total = $request->requested_quantity * $piece->cost;
    
            // Generate invoice data
            $invoiceData = [
                'numero_facture' => $request->commande_id, // Assuming commande_id is the invoice number
                'date' => now()->format('d/m/Y'), // Assuming today's date is the invoice date
                'nom_piece' => $piece->nom_piece,
                'prix_unitaire' => $piece->cost,
                'quantite' => $request->requested_quantity,
                'total' => $total,
                'fournisseur' => $fournisseur->nom_fournisseur,
                'expected_delivery_date' => $request->expected_delivery_date,
            ];
    
            // Generate PDF
            $pdfPath = $this->generatePdf($invoiceData);
    
            // Store PDF
            // You can store the PDF in storage or any other location as per your requirement
    
            // Send email with PDF attachment
            Mail::to($fournisseur->email)->send(new CommandeNotification($invoiceData, $pdfPath));
            $validatedData["facture_url"]=$pdfPath;
            // Create pending order
           $commande = CommandeEnAttente::create($validatedData);
    
            return response()->json(['commande' => $commande, 'pdf_path' => $pdfPath], 201);
        }

        
        private function generatePdf($data)
        {
            // Generate PDF logic
            $options = new Options();
            $options->set('isHtml5ParserEnabled', true);
            $dompdf = new Dompdf($options);
            $dompdf->loadHtml(view('facture', $data)); // Assuming you have a blade template named 'facture'
            $dompdf->setPaper('A4', 'portrait');
            $dompdf->render();
            $output = $dompdf->output();
        
            // Store PDF in the storage folder
            $fileName = uniqid() . '.pdf'; // Generate a unique file name
            $filePath = 'pdf/' . $fileName; // Path to store PDF in the storage folder
            Storage::put($filePath, $output); // Save the PDF to the storage folder
        
            return $filePath;
        }
//leeee yda5alha fi 7iit  barnn tqt alik amen allah hhhhhhhh//leee barra hez les fichier eli 3malt fehom modification fasa5hom w 3ewed habet lprojet belehi t3ebet lahkika wlh 
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
    
>>>>>>> Stashed changes
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
