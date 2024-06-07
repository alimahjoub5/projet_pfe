<?php

namespace App\Http\Controllers\GestionStocks;

use App\Models\CommandeEnAttente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\Fournisseur;
use App\Models\Piece;
use App\Models\StockPiece;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use App\Mail\CommandeNotification;

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
        // Log the full request content for debugging
        Log::info('Request Content:', $request->all());
    
        // Assuming the payload is an array of objects
        $ordersData = $request->all();
    
        $responses = [];
    
        foreach ($ordersData as $requestData) {
            // Validate request data
            $validatedData = validator($requestData, [
                'fournisseur_id' => 'required|integer',
                'requested_quantity' => 'required|integer',
                'piece_id' => 'required|integer',
                'expected_delivery_date' => 'nullable|date',
            ])->validate();
    
            // Fetch supplier details
            $fournisseur = Fournisseur::findOrFail($validatedData['fournisseur_id']);
    
            // Fetch piece details
            $piece = Piece::findOrFail($validatedData['piece_id']);
    
            // Calculate total cost
            $total = $validatedData['requested_quantity'] * $piece->cost;
    
            // Generate invoice data
            $invoiceData = [
                'numero_commande' => $requestData['commande_id'] ?? 'N/A', // Assuming commande_id is the invoice number
                'date' => now()->format('d/m/Y'), // Assuming today's date is the invoice date
                'nom_piece' => $piece->nom_piece,
                'quantite' => $validatedData['requested_quantity'],
                'fournisseur' => $fournisseur->nom_fournisseur,
                'expected_delivery_date' => $validatedData['expected_delivery_date'],
            ];
    
            // Generate PDF
            $pdfPath = $this->generatePdf($invoiceData);
    
            // Send email with PDF attachment
            Mail::to($fournisseur->email)->send(new CommandeNotification($invoiceData, $pdfPath));
    
            // Add PDF path to validated data
            $validatedData['facture_url'] = $pdfPath;
    
            // Create pending order
            $commande = CommandeEnAttente::create($validatedData);
    
            // Add the response to the array
            $responses[] = ['commande' => $commande, 'pdf_path' => $pdfPath];
        }
    
        return response()->json($responses, 201);
    }
    
    private function generatePdf($data)
    {
        // Generate PDF logic
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $dompdf = new Dompdf($options);
    
        // Load the HTML template and pass the data to it
        $html = view('facture', $data)->render();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $output = $dompdf->output();
    
        // Store PDF in the storage folder
        $fileName = uniqid() . '.pdf'; // Generate a unique file name
        $filePath = 'pdf/' . $fileName; // Path to store PDF in the storage folder
        Storage::put($filePath, $output); // Save the PDF to the storage folder
    
        return $filePath;
    }
    

    


        
        
        public function update(Request $request, $id)
        {
            $commande = CommandeEnAttente::find($id);
            if (!$commande) {
                return response()->json(['message' => 'Commande en attente introuvable'], 404);
            }
        
            $validator = Validator::make($request->all(), [
                'piece_id' => 'exists:pieces,piece_id',
                'requested_quantity' => 'numeric',
                'order_date' => 'date',
                'order_status' => 'string',
                'fournisseur_id' => 'exists:fournisseurs,fournisseur_id',
                'expected_delivery_date' => 'nullable|date',
                'actual_delivery_date' => 'nullable|date',
                // Ajoutez les autres règles de validation ici
            ]);
        
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 422);
            }
        
            $validatedData = $validator->validated();
        
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
