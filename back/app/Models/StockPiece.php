<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockPiece extends Model
{
    use HasFactory;

    protected $table = 'stock_pieces';
    protected $primaryKey = 'stock_id';

    protected $fillable = [
        'piece_id',
        'equipment_id',
        'quantity',
        'reserved_quantity',
        'local',
        'created_by',
        'modify_by',
    ];

    public function piece()
    {
        return $this->belongsTo(Piece::class, 'piece_id');
    }

    public function equipment()
    {
        return $this->belongsTo(EquipmentType::class, 'EquipmentTypeID');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function modifyBy()
    {
        return $this->belongsTo(User::class, 'modify_by');
    }
}
