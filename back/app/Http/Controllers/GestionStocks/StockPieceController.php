<?php

namespace App\Http\Controllers\GestionStocks;

use Illuminate\Http\Request;
use App\Models\StockPiece;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class StockPieceController extends Controller
{

    public function index()
    {
        $stockPieces = StockPiece::with('piece', 'equipment')->get();
        return response()->json($stockPieces);
    }
    
    


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'piece_id' => 'required',
            'equipment_id' => 'required',
            'quantity' => 'required',
            'local' => 'required',
            'created_by' => 'required',
        ]);

        $stockPiece = StockPiece::create($validatedData);

        return response()->json($stockPiece, 201);
    }

    public function show(StockPiece $stockPiece)
    {
        return response()->json($stockPiece);
    }

    public function update(Request $request, StockPiece $stockPiece)
    {
        $validatedData = $request->validate([
            'piece_id' => 'required',
            'equipment_id' => 'required',
            'quantity' => 'required',
            'reserved_quantity' => 'required',
            'local' => 'required',
            'modify_by' => 'required',
        ]);

        $stockPiece->update($validatedData);

        return response()->json($stockPiece, 200);
    }


    public function destroy(StockPiece $stockPiece)
    {
        $stockPiece->delete();

        return response()->json(null, 204);
    }
}
