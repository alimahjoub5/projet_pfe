<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    protected $table = 'fournisseurs';
    protected $primaryKey = 'fournisseur_id';

    protected $fillable = [
        'nom_fournisseur',
        'adresse',
        'email',
        'telephone',
        'created_at',
        'created_by',
        'modify_at',
        'modify_by',
    ];
}
