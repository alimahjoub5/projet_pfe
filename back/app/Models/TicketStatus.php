<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketStatus extends Model
{
    use HasFactory;

    protected $table = 'ticket_status';
    protected $primaryKey = 'StatusCodeID';
    public $timestamps = false; // Si vous utilisez les colonnes `created_at` et `updated_at` dans la base de données, changez cette valeur à `true`.

    protected $fillable = [
        'StatusName',
        'CreatedBy',
        'CreatedOn',
        'ModifiedBy',
        'ModifiedOn',
    ];

    protected $dates = [
        'CreatedOn',
        'ModifiedOn',
    ];

    // Relations éventuelles à définir ici
}
