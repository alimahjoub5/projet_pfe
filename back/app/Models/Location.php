<?php 
namespace App\Models; 


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $primaryKey = 'location_id';

    protected $fillable = [
        'name',
    ];

    public function pieces()
    {
        return $this->hasMany(Piece::class, 'location_id');
    }
}
