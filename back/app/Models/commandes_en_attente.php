<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandeEnAttente extends Model
{
    use HasFactory;

    protected $primaryKey = 'commande_id';

    protected $fillable = [
        'piece_id',
        'requested_quantity',
        'order_date',
        'order_status',
        'fournisseur_id',
        'expected_delivery_date',
        'actual_delivery_date',
    ];

    public function piece()
    {
        return $this->belongsTo(Piece::class, 'piece_id');
    }

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class, 'fournisseur_id');
    }
}
