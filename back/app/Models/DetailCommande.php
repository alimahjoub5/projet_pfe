<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailCommande extends Model
{
    protected $table = 'details_commandes';

    protected $fillable = [
        'commande_id',
        'stock_id',
        'quantite_commandee',
        'quantite_recue',
        'prix_unitaire',
        'montant_total',
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }
}
