<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $table = 'stocks';
    protected $primaryKey = 'stock_id';

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

    protected $uploadFolder = 'stocks'; // Chemin relatif du répertoire d'images

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }

    // Accessor pour générer l'URL de l'image
    public function getImageUrlAttribute()
    {
        return asset('images/' . $this->uploadFolder . '/' . $this->image_piece);
    }
}
