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
use Illuminate\Support\Facades\Storage;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Facades\URL;
class CommandeEnAttenteController extends Controller
{

    public function index()
    {
        $commandes = CommandeEnAttente::with('fournisseur', 'piece')->get();
    
        // Ajouter le lien du fichier PDF à chaque commande
        $commandes->transform(function ($commande) {
            $pdfPath = ''; // Chemin du fichier PDF
            // Si vous avez stocké le PDF dans le stockage Laravel
            if ($commande->facture_url) {
                // Construire le chemin complet du fichier PDF
                $pdfPath = asset("api/".$commande->facture_url);
            }
    
            // Ajouter le lien du PDF à la commande
            $commande->pdf_link = $pdfPath;
    
            return $commande;
        });
    
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
            //Mail::to($fournisseur->email)->send(new CommandeNotification($invoiceData, $pdfPath));
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
