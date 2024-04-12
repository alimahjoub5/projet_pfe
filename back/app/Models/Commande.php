<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $table = 'commandes';

    protected $fillable = [
        'date_commande',
        'date_livraison_prevue',
        'date_livraison_effective',
        'statut',
        'fournisseur_id',
        'total_commande',
    ];

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }
}
