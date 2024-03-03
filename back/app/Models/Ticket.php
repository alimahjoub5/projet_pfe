<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $table = 'tickets';
    protected $primaryKey = 'TicketID';
    public $timestamps = false; // Si vous utilisez les colonnes `created_at` et `updated_at` dans la base de données, changez cette valeur à `true`.

    protected $fillable = [
        'CreatedBy',
        'CreatedOn',
        'ModifiedBy',
        'ModifiedOn',
        'StatusCodeID',
        'AssigneeID',
        'Subject',
        'Description',
        'PriorityID',
        'GroupID',
        'EquipmentTypeID',
        'StartDate',
        'EndDate',
        'DueDate',
        'ClosedDate',
    ];

    protected $dates = [
        'CreatedOn',
        'ModifiedOn',
        'StartDate',
        'EndDate',
        'DueDate',
        'ClosedDate',
    ];

 
    // Relations éventuelles à définir ici
}
