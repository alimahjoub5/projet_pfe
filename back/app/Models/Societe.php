<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Societe extends Model
{
    use HasFactory;

    protected $table = 'societe';

    protected $primaryKey = 'SocieteID';

    protected $fillable = [
        'name',
        'address',
        'city',
        'country',
        'phone',
        'email',
        'website',
        'contact_person',
        'contact_phone',
        'contact_email',
    ];

    // Si vous avez besoin d'autres relations ou d'autres méthodes dans ce modèle, vous pouvez les ajouter ici
}
