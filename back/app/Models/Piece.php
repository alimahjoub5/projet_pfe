<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Piece extends Model
{
    use HasFactory;

    protected $table = 'pieces';
    protected $primaryKey = 'piece_id';

    protected $fillable = [
        'nom_piece',
        'description',
        'image_piece',
        'material',
        'serial_number',
        'fabrication_date',
        'expiration_date',
        'cost',
        'fournisseur_id',
    ];

    public function fournisseurs()
    {
        return $this->hasMany(Fournisseur::class, 'fournisseur_id', 'fournisseur_id');
    }

    public function locations()
    {
        return $this->hasMany(Location::class);
    }

    public function stockPiece()
    {
        return $this->hasOne(StockPiece::class, 'piece_id');
    }
    
}
