<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $table = 'stocks';

    protected $fillable = [
        'nom_piece',
        'description', // Champ pour la description de la pièce
        'image_piece',
        'quantite',
        'quantite_reservee',
        'seuil_min',
        'seuil_max',
        'fournisseur_id',
        'created_at',
        'created_by',
        'modify_at',
        'modify_by',
    ];

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }
}
