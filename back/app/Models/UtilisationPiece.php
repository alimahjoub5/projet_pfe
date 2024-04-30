<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UtilisationPiece extends Model
{
    use HasFactory;

    protected $primaryKey = 'utilisation_id';

    protected $fillable = [
        'EquipmentTypeID',
        'piece_id',
        'quantity_used',
        'date_utilisation',
        'description',
    ];

    public function equipment()
    {
        return $this->belongsTo(EquipmentType::class, 'EquipmentTypeID');
    }
    

    public function piece()
    {
        return $this->belongsTo(Piece::class, 'piece_id');
    }


}
